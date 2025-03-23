import React from "react";

const InsightsGrid = ({ candidateAssesment }) => {
  // Extract relevant data from the candidate assessment
  const roleDemand = candidateAssesment?.role_demand || "N/A";
  const offerAcceptance = candidateAssesment?.offer_acceptance || "N/A";
  const predictedTenure = candidateAssesment?.predicted_tenure || "N/A";
  const industryAverage = candidateAssesment?.industry_average || "N/A";
  
  const genderRepresentation = "+2.5%"; // You can replace this with actual data if available
  const ageDiversity = "+1.8%"; // Replace with actual data if needed
  const ethnicDiversity = "+3.2%"; // Replace with actual data if needed

  return (
    <section className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
      {/* Market Insights */}
      <article className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Market Insights</h2>
        <div className="flex justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="text-3xl font-bold text-blue-600">{roleDemand}</p>
            <p className="text-sm text-gray-600">Role Demand Index</p>
            <span className="px-2 py-1.5 text-xs text-blue-700 bg-blue-100 rounded-full">
              High Demand
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-3xl font-bold text-emerald-600">{offerAcceptance}</p>
            <p className="text-sm text-gray-600">Offer Acceptance Rate</p>
            <span className="px-2 py-1.5 text-xs text-emerald-700 bg-emerald-100 rounded-full">
              Above Average
            </span>
          </div>
        </div>
      </article>

      {/* Retention Metrics */}
      <article className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Retention Metrics</h2>
        <div className="flex flex-col gap-6">
          {/* Predicted Tenure */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Predicted Tenure</p>
              <p className="text-base font-bold">{predictedTenure}</p>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="w-4/5 h-full bg-violet-500 rounded-full" />
            </div>
          </div>

          {/* Industry Average */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Industry Average</p>
              <p className="text-base font-bold">{industryAverage}</p>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="w-3/5 h-full bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
      </article>

      {/* DEI Impact */}
      <article className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="mb-6 text-xl font-bold">DEI Impact</h2>
        <div className="flex flex-col gap-4">
          {/* Gender Representation */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Gender Representation</p>
            <p className="text-sm font-bold text-emerald-600">{genderRepresentation}</p>
          </div>
          {/* Age Diversity */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Age Diversity</p>
            <p className="text-sm font-bold text-emerald-600">{ageDiversity}</p>
          </div>
          {/* Ethnic Diversity */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Ethnic Diversity</p>
            <p className="text-sm font-bold text-emerald-600">{ethnicDiversity}</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default InsightsGrid;
