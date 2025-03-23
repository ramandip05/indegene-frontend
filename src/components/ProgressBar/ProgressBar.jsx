import React from "react";

const ProgressBar = ({ progress, color = "emerald", className = "" }) => {
  const colorMap = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    violet: "bg-violet-500",
    gray: "bg-gray-400",
  };

  return (
    <div className={`overflow-hidden h-4 bg-gray-100 rounded-full ${className}`}>
      <div
        className={`h-full ${colorMap[color]}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
