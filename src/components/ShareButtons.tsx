import React, { useState } from "react";
import { Share2, Twitter, Copy, Check } from "lucide-react";
import type { Question } from "../types";
import { shareToTwitter, copyToClipboard } from "../utils/shareUtils";

interface ShareButtonsProps {
  question: Question;
  selectedOption: "A" | "B";
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ question, selectedOption }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(question, selectedOption);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-6 animate-slide-up">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share your choice:
        </span>

        <button
          onClick={() => shareToTwitter(question, selectedOption)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </button>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg ${
            copied
              ? "bg-success text-white"
              : "bg-gray-700 hover:bg-gray-800 text-white"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
