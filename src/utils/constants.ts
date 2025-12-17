import type { Category, CategoryInfo } from "../types";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "random",
    label: "Random",
    emoji: "🎲",
    description: "Surprise me!",
  },
  {
    id: "career",
    label: "Career",
    emoji: "💼",
    description: "Professional dilemmas",
  },
  {
    id: "relationships",
    label: "Relationships",
    emoji: "❤️",
    description: "Personal connections",
  },
  {
    id: "superpowers",
    label: "Superpowers",
    emoji: "⚡",
    description: "Hypothetical abilities",
  },
  {
    id: "money",
    label: "Money",
    emoji: "💰",
    description: "Financial choices",
  },
  {
    id: "ethics",
    label: "Ethics",
    emoji: "⚖️",
    description: "Moral dilemmas",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    emoji: "🌟",
    description: "Daily life choices",
  },
];

export const getCategoryInfo = (category: Category): CategoryInfo => {
  return CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
};
