import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

const SkillAnalysis = ({ candidateAssesment }) => {
  // Extract cultural alignment string safely
  const culturalAlignmentString = candidateAssesment?.cultural_aligment;
  let culturalData = {};

  if (culturalAlignmentString) {
    try {
      // Format the string into valid JSON
      const validJsonString = culturalAlignmentString
        .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // Add quotes around keys
        .replace(/%/g, ''); // Remove the '%' symbol from values

      // Parse the formatted string into an object
      culturalData = JSON.parse(validJsonString);
    } catch (error) {
      console.error("Error parsing cultural alignment data:", error);
    }
  }

  return (
    <section className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
      {/* Skill Gap Analysis */}
      <article className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Skill Gap Analysis</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p>UI Design</p>
            <ProgressBar progress={90} color="emerald" className="flex-1 mx-4" />
            <span>90%</span>
          </div>
          <div className="flex justify-between items-center">
            <p>User Research</p>
            <ProgressBar progress={85} color="emerald" className="flex-1 mx-4" />
            <span>85%</span>
          </div>
          <div className="flex justify-between items-center">
            <p>Prototyping</p>
            <ProgressBar progress={70} color="amber" className="flex-1 mx-4" />
            <span>70%</span>
          </div>
        </div>
      </article>

      {/* Cultural Alignment */}
      <article className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Cultural Alignment</h2>
        <div className="flex flex-col gap-4">
          {Object.entries(culturalData).map(([key, value], index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{key}</p>
              <ProgressBar
                progress={Number(value) || 0} // Ensure the progress value is a valid number
                color={key === "Innovation" || key === "Leadership" ? "emerald" : "amber"}
                className="flex-1 mx-4"
              />
              <span>{`${value}%`}</span> {/* Display percentage */}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default SkillAnalysis;
