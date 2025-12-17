import React from "react";
import { AlertCircle } from "lucide-react";

interface ConsequenceRevealProps {
  consequences: string;
  selectedOption: "A" | "B";
}

const ConsequenceReveal: React.FC<ConsequenceRevealProps> = ({
  consequences,
  selectedOption,
}) => {
  return (
    <div className="mt-6 animate-slide-up">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-md border border-purple-100">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              ⚡ Consequences of Option {selectedOption}:
            </h3>
            <p className="text-gray-700 leading-relaxed">{consequences}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsequenceReveal;
