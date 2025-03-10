import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import candidateData from "@/data/candidateData";

const JobCandidates = ({ candidates, jobID }) => {
  const router = useRouter();
  
  // Function to filter candidates based on candidate IDs
  const filterCandidates = (candidateIds) => {
    return candidateData.filter(candidate => candidateIds.includes(candidate.candidateID));
  };

  // State to track filtered candidates
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  // State to track availability per candidate using candidateID
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    if (candidates && candidates.length > 0) {
      const filtered = filterCandidates(candidates);
      setFilteredCandidates(filtered);

      // Initialize availability state based on filtered candidates
      const initialAvailability = filtered.reduce((acc, candidate) => {
        acc[candidate.candidateID] = candidate.available || false;
        return acc;
      }, {});
      setAvailability(initialAvailability);
    }
  }, [candidates]);

  // Function to update availability of a specific candidate by candidateID
  const handleAvailability = (candidateID, status) => {
    setAvailability((prev) => ({
      ...prev,
      [candidateID]: status,
    }));
    if (status) {
      router.push(`/job-details/${jobID}/candidate-profile/${candidateID}`);
    }
  };

  return (
    <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Potential Candidates</h2>

      {/* Scrollable Wrapper for the Table */}
      <div className="max-h-[400px] overflow-y-auto overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="sticky top-0 bg-[#f5f9ff] text-gray-600 text-sm">
            <tr>
              <th className="p-3 border">No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">AI Score</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">LinkedIn</th>
              <th className="p-3 border">Resume</th>
              <th className="p-3 border">Available</th>
            </tr>
          </thead>

          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
                <tr key={candidate.candidateID} className="text-sm border">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{candidate.name}</td>
                  <td className="p-3 border">{candidate.AI_score}</td>
                  <td className="p-3 border">{candidate.category}</td>
                  <td className="p-3 border text-blue-600 cursor-pointer">
                    <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  </td>
                  <td className="p-3 border text-center">
                    <Button className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md">
                      Download
                    </Button>
                  </td>
                  <td className="p-3 border text-center flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleAvailability(candidate.candidateID, true)}
                      className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer ${
                        availability[candidate.candidateID] ? "bg-green-500 text-white" : "bg-gray-300 text-black"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleAvailability(candidate.candidateID, false)}
                      className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer ${
                        !availability[candidate.candidateID] ? "bg-red-500 text-white" : "bg-gray-300 text-black"
                      }`}
                    >
                      No
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No candidates available for this job.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobCandidates;

