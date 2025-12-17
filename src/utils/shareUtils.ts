import type { Question } from "../types";

export const shareToTwitter = (question: Question, selectedOption: "A" | "B"): void => {
  const option = selectedOption === "A" ? question.optionA : question.optionB;
  const text = `Would you rather: ${option.text}\n\nWhat would you choose? 🤔`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

export const shareToReddit = (question: Question): void => {
  const title = `Would you rather: ${question.optionA.text} OR ${question.optionB.text}?`;
  const url = `https://reddit.com/submit?title=${encodeURIComponent(title)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

export const copyToClipboard = async (question: Question, selectedOption?: "A" | "B"): Promise<boolean> => {
  const text = selectedOption
    ? `Would you rather: ${selectedOption === "A" ? question.optionA.text : question.optionB.text}\n\nI chose this option! What would you choose? 🤔`
    : `Would you rather:\nA) ${question.optionA.text}\nB) ${question.optionB.text}\n\nWhat would you choose? 🤔`;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};
