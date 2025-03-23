import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CandidateHeader = ({ candidateAssesment }) => {
  // Provide fallback for missing candidate data
  const name = candidateAssesment?.name || "NA";
  const role = candidateAssesment?.role || "NA";

  return (
    <header className="flex justify-between items-center mb-8 max-md:flex-col max-md:gap-4 max-md:items-start">
      {/* Candidate Info Section */}
      <div className="flex gap-4 items-center">
      <Avatar className="w-24 h-24 mr-6">
        <AvatarImage src={candidateAssesment?.image || "/default-avatar.png"} alt={candidateAssesment?.name} />
        <AvatarFallback>{candidateAssesment?.name?.charAt(0)?.toUpperCase() || "?"}</AvatarFallback>
      </Avatar>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-black">{name}</h1>
          <p className="text-base text-gray-600">{role}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 items-center">
        <button className="flex gap-2 items-center px-4 py-2.5 text-white bg-blue-600 rounded-lg">
          <i className="ti ti-download text-base" />
          <span>Export Report</span>
        </button>
        <button className="flex gap-2 items-center px-4 py-2.5 rounded-lg border border-gray-300">
          <i className="ti ti-share text-base" />
          <span>Share</span>
        </button>
      </div>
    </header>
  );
};

export default CandidateHeader;
