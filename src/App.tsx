import React, { useState, useEffect } from "react";
import { QuestionProvider, useQuestion } from "./context/QuestionContext";
import Header from "./components/Header";
import CategorySelector from "./components/CategorySelector";
import QuestionCard from "./components/QuestionCard";
import LoadingSpinner from "./components/LoadingSpinner";
import type { Category } from "./types";
import { RefreshCw, AlertCircle } from "lucide-react";

const AppContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("random");
  const { currentQuestion, isLoading, error, generateNewQuestion, resetSelection } = useQuestion();

  // Generate initial question on mount
  useEffect(() => {
    generateNewQuestion(selectedCategory);
  }, []);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleGenerateNew = () => {
    resetSelection();
    generateNewQuestion(selectedCategory);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          disabled={isLoading}
        />

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
                {error.includes("API key") && (
                  <p className="text-xs text-red-600 mt-2">
                    Please create a <code className="bg-red-100 px-1 rounded">.env</code> file with{" "}
                    <code className="bg-red-100 px-1 rounded">VITE_ANTHROPIC_API_KEY=your_key_here</code>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSpinner />}

        {/* Question Display */}
        {!isLoading && currentQuestion && !error && (
          <>
            <QuestionCard question={currentQuestion} />

            {/* Next Question Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleGenerateNew}
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <RefreshCw className="w-5 h-5" />
                Generate New Question
              </button>
            </div>
          </>
        )}

        {/* Retry Button (shown on error) */}
        {error && !isLoading && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleGenerateNew}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>Powered by Claude AI • Every question is unique</p>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QuestionProvider>
      <AppContent />
    </QuestionProvider>
  );
};

export default App;
