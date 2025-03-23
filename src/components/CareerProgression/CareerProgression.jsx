import React from "react";

const CareerProgression = ({ candidateAssesment }) => {
  // Extract career progression from the candidate assessment
  const careerProgressionString = candidateAssesment?.career_progression;

  // Check if careerProgressionString exists and format it correctly
  let careerData = {};
  if (careerProgressionString) {
    try {
      // Replace single quotes with double quotes for valid JSON parsing
      const formattedString = careerProgressionString.replace(/'/g, '"');
      careerData = JSON.parse(formattedString); // Parse the formatted string into an object
    } catch (error) {
      console.error("Error parsing career progression data:", error);
    }
  }

  return (
    <article className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="mb-5 text-lg font-bold">Career Progression</h2>
      <div className="relative">
        <div className="mb-8 w-full h-1 bg-gray-200" />
        <div className="flex justify-between max-md:flex-wrap max-md:gap-6">
          {Object.entries(careerData).map(([year, role], index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-2.5 w-8 h-8 bg-blue-500 rounded-full" />
              <time className="mb-1.5 text-base font-bold">{year}</time>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default CareerProgression;


