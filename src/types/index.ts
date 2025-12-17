export type Category =
  | "career"
  | "relationships"
  | "superpowers"
  | "money"
  | "ethics"
  | "lifestyle"
  | "random";

export interface QuestionOption {
  text: string;
  consequences: string;
}

export interface Question {
  id: string;
  category: Category;
  optionA: QuestionOption;
  optionB: QuestionOption;
  votesA: number;
  votesB: number;
  timestamp: number;
}

export interface UserChoice {
  questionId: string;
  selectedOption: "A" | "B";
  timestamp: number;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  emoji: string;
  description: string;
}
