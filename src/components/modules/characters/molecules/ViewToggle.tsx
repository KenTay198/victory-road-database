import React from "react";
import { FaTable, FaTh } from "react-icons/fa";

interface IProps {
  currentView: "table" | "grid";
  onViewChange: (view: "table" | "grid") => void;
}

function ViewToggle({ currentView, onViewChange }: IProps) {
  return (
    <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden mb-4">
      <div
        onClick={() => onViewChange("table")}
        className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
          currentView === "table"
            ? "bg-raimon-blue text-white"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        <FaTable />
      </div>
      <div
        onClick={() => onViewChange("grid")}
        className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
          currentView === "grid"
            ? "bg-raimon-blue text-white"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        <FaTh />
      </div>
    </div>
  );
}

export default ViewToggle;
