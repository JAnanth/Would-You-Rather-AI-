import React from "react";
import type { Category } from "../types";
import { CATEGORIES } from "../utils/constants";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  disabled?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
  disabled = false,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
        Choose a category:
      </label>
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            disabled={disabled}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              flex items-center gap-2
              ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
            `}
          >
            <span className="text-lg">{category.emoji}</span>
            <span className="text-sm">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
