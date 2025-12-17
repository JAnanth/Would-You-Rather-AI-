import type { UserChoice } from "../types";

const CHOICES_KEY = "wyr_user_choices";
const VOTES_KEY = "wyr_votes";
const SEEN_KEY = "wyr_seen_questions";

export const getStoredChoices = (): UserChoice[] => {
  try {
    const stored = localStorage.getItem(CHOICES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading choices from localStorage:", error);
    return [];
  }
};

export const saveChoice = (choice: UserChoice): void => {
  try {
    const choices = getStoredChoices();
    choices.push(choice);
    localStorage.setItem(CHOICES_KEY, JSON.stringify(choices));
  } catch (error) {
    console.error("Error saving choice to localStorage:", error);
  }
};

export const getVotes = (questionId: string): { votesA: number; votesB: number } => {
  try {
    const stored = localStorage.getItem(VOTES_KEY);
    const votes = stored ? JSON.parse(stored) : {};
    return votes[questionId] || { votesA: 0, votesB: 0 };
  } catch (error) {
    console.error("Error reading votes from localStorage:", error);
    return { votesA: 0, votesB: 0 };
  }
};

export const saveVote = (questionId: string, option: "A" | "B"): void => {
  try {
    const stored = localStorage.getItem(VOTES_KEY);
    const votes = stored ? JSON.parse(stored) : {};

    if (!votes[questionId]) {
      votes[questionId] = { votesA: 0, votesB: 0 };
    }

    if (option === "A") {
      votes[questionId].votesA += 1;
    } else {
      votes[questionId].votesB += 1;
    }

    localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
  } catch (error) {
    console.error("Error saving vote to localStorage:", error);
  }
};

export const markQuestionSeen = (questionId: string): void => {
  try {
    const stored = localStorage.getItem(SEEN_KEY);
    const seen = stored ? JSON.parse(stored) : [];
    if (!seen.includes(questionId)) {
      seen.push(questionId);
      localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
    }
  } catch (error) {
    console.error("Error marking question as seen:", error);
  }
};

export const getSeenQuestions = (): string[] => {
  try {
    const stored = localStorage.getItem(SEEN_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading seen questions from localStorage:", error);
    return [];
  }
};

export const hasUserVoted = (questionId: string): boolean => {
  const choices = getStoredChoices();
  return choices.some((choice) => choice.questionId === questionId);
};

export const getUserChoice = (questionId: string): UserChoice | undefined => {
  const choices = getStoredChoices();
  return choices.find((choice) => choice.questionId === questionId);
};
