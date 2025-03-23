import React from "react";

const MetricsGrid = ({ candidateAssesment }) => {
  // Ensure key_differentiators exists before accessing and splitting
  const keyDifferentiators = candidateAssesment?.key_differentiators
    ? candidateAssesment.key_differentiators.split(", ")
    : [];

  return (
    <section className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
      <article className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Overall Match Score</h2>
        <p className="mb-6 h-48 text-4xl font-bold text-blue-600">
          {candidateAssesment?.overall_match_score}
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-base">Technical Fit</p>
            <p className="text-base font-bold text-emerald-600">
              {candidateAssesment?.technical_filt}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base">Cultural Fit</p>
            <p className="text-base font-bold text-emerald-600">
              {candidateAssesment?.cultural_fit}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base">Behavioral Fit</p>
            <p className="text-base font-bold text-amber-600">
              {candidateAssesment?.behavioral_fit}
            </p>
          </div>
        </div>
      </article>

      <article className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Skill Match Analysis</h2>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-2 items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full" />
            <p>Candidate</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-3 h-3 bg-gray-300 rounded-full" />
            <p>Top Performers</p>
          </div>
        </div>
      </article>

      <article className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Key Differentiators</h2>
        <ul className="flex flex-col gap-4">
          {keyDifferentiators.length > 0 ? (
            keyDifferentiators.map((item, index) => (
              <li key={index} className="flex gap-3 items-center">
                <i className="ti ti-star text-base" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No key differentiators available.</li>
          )}
        </ul>
      </article>
    </section>
  );
};

export default MetricsGrid;
