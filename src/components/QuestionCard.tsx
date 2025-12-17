import React from "react";
import type { Question } from "../types";
import { useQuestion } from "../context/QuestionContext";
import OptionCard from "./OptionCard";
import ConsequenceReveal from "./ConsequenceReveal";
import Statistics from "./Statistics";
import ShareButtons from "./ShareButtons";
import { getCategoryInfo } from "../utils/constants";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { selectedOption, selectOption } = useQuestion();
  const categoryInfo = getCategoryInfo(question.category);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Category Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-200">
          <span className="text-xl">{categoryInfo.emoji}</span>
          <span className="font-semibold text-gray-700">{categoryInfo.label}</span>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <OptionCard
          option={question.optionA}
          label="A"
          isSelected={selectedOption === "A"}
          isOtherSelected={selectedOption === "B"}
          onSelect={() => selectOption("A")}
          disabled={selectedOption !== null}
        />
        <OptionCard
          option={question.optionB}
          label="B"
          isSelected={selectedOption === "B"}
          isOtherSelected={selectedOption === "A"}
          onSelect={() => selectOption("B")}
          disabled={selectedOption !== null}
        />
      </div>

      {/* Consequences and Statistics (shown after selection) */}
      {selectedOption && (
        <>
          <ConsequenceReveal
            consequences={
              selectedOption === "A"
                ? question.optionA.consequences
                : question.optionB.consequences
            }
            selectedOption={selectedOption}
          />
          <Statistics votesA={question.votesA} votesB={question.votesB} />
          <ShareButtons question={question} selectedOption={selectedOption} />
        </>
      )}
    </div>
  );
};

export default QuestionCard;
