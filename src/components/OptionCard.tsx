import React from "react";
import type { QuestionOption } from "../types";
import { CheckCircle2 } from "lucide-react";

interface OptionCardProps {
  option: QuestionOption;
  label: "A" | "B";
  isSelected: boolean;
  isOtherSelected: boolean;
  onSelect: () => void;
  disabled: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({
  option,
  label,
  isSelected,
  isOtherSelected,
  onSelect,
  disabled,
}) => {
  return (
    <div
      onClick={!disabled ? onSelect : undefined}
      className={`
        relative p-6 rounded-xl shadow-lg transition-all duration-300
        ${!disabled ? "cursor-pointer" : "cursor-default"}
        ${
          isSelected
            ? "bg-primary text-white scale-105 shadow-2xl ring-4 ring-primary ring-opacity-50"
            : isOtherSelected
            ? "bg-gray-100 text-gray-500 opacity-60"
            : "bg-white text-gray-900 hover:shadow-xl hover:scale-102"
        }
        ${!disabled && !isSelected && !isOtherSelected ? "hover:bg-gray-50" : ""}
      `}
    >
      {/* Label Badge */}
      <div
        className={`
          absolute -top-3 -left-3 w-10 h-10 rounded-full
          flex items-center justify-center font-bold text-lg shadow-md
          ${isSelected ? "bg-white text-primary" : "bg-primary text-white"}
        `}
      >
        {label}
      </div>

      {/* Selected Check Mark */}
      {isSelected && (
        <div className="absolute -top-3 -right-3">
          <CheckCircle2 className="w-8 h-8 text-success bg-white rounded-full" />
        </div>
      )}

      {/* Option Text */}
      <div className="mt-2">
        <p className="text-lg font-semibold leading-relaxed">{option.text}</p>
      </div>

      {/* Click to Choose Hint */}
      {!disabled && !isSelected && !isOtherSelected && (
        <div className="mt-4 text-sm font-medium opacity-70">
          Click to choose →
        </div>
      )}
    </div>
  );
};

export default OptionCard;
