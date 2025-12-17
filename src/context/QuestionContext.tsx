import React, { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Question, Category } from "../types";
import { generateQuestion } from "../utils/aiGenerator";
import { saveChoice, saveVote, getVotes } from "../utils/localStorage";

interface QuestionContextType {
  currentQuestion: Question | null;
  selectedOption: "A" | "B" | null;
  isLoading: boolean;
  error: string | null;
  generateNewQuestion: (category: Category) => Promise<void>;
  selectOption: (option: "A" | "B") => void;
  resetSelection: () => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export const useQuestion = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }
  return context;
};

interface QuestionProviderProps {
  children: ReactNode;
}

export const QuestionProvider: React.FC<QuestionProviderProps> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNewQuestion = useCallback(async (category: Category) => {
    setIsLoading(true);
    setError(null);
    setSelectedOption(null);

    try {
      const question = await generateQuestion(category);
      // Get existing votes from localStorage
      const votes = getVotes(question.id);
      question.votesA = votes.votesA || question.votesA;
      question.votesB = votes.votesB || question.votesB;

      setCurrentQuestion(question);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate question";
      setError(errorMessage);
      console.error("Error generating question:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectOption = useCallback(
    (option: "A" | "B") => {
      if (!currentQuestion || selectedOption) return;

      setSelectedOption(option);

      // Save the choice
      saveChoice({
        questionId: currentQuestion.id,
        selectedOption: option,
        timestamp: Date.now(),
      });

      // Save the vote
      saveVote(currentQuestion.id, option);

      // Update the current question's vote counts
      setCurrentQuestion((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          votesA: option === "A" ? prev.votesA + 1 : prev.votesA,
          votesB: option === "B" ? prev.votesB + 1 : prev.votesB,
        };
      });
    },
    [currentQuestion, selectedOption]
  );

  const resetSelection = useCallback(() => {
    setSelectedOption(null);
  }, []);

  const value: QuestionContextType = {
    currentQuestion,
    selectedOption,
    isLoading,
    error,
    generateNewQuestion,
    selectOption,
    resetSelection,
  };

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>;
};
