import React from "react";
import { HelpCircle } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-2">
        <HelpCircle className="w-8 h-8 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Would You Rather?
        </h1>
      </div>
      <p className="text-lg md:text-xl text-gray-600 font-medium">
        Impossible choices, real consequences
      </p>
    </header>
  );
};

export default Header;
