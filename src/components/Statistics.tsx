import React from "react";
import { BarChart3 } from "lucide-react";

interface StatisticsProps {
  votesA: number;
  votesB: number;
}

const Statistics: React.FC<StatisticsProps> = ({ votesA, votesB }) => {
  const total = votesA + votesB;
  const percentA = total > 0 ? Math.round((votesA / total) * 100) : 50;
  const percentB = total > 0 ? Math.round((votesB / total) * 100) : 50;

  return (
    <div className="mt-6 animate-slide-up">
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-gray-900">
            📊 What Others Chose:
          </h3>
        </div>

        {/* Option A Stats */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Option A</span>
            <span className="text-sm font-bold text-primary">{percentA}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentA}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{votesA.toLocaleString()} votes</p>
        </div>

        {/* Option B Stats */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Option B</span>
            <span className="text-sm font-bold text-secondary">{percentB}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-secondary h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentB}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{votesB.toLocaleString()} votes</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
