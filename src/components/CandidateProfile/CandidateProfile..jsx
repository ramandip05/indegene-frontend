"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // Import Lucide Loader

const CandidateProfile = ({candidateData}) => {
  const { candidateID } = useParams();
  // const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState(null);

  console.log("Candidate ID from URL:", candidateData);

  // const fetchCandidateData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       "https://prod-10.centralindia.logic.azure.com:443/workflows/7872db48cf6241d089d4629b3dce2539/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Dl1C8HB77eoqGo2Svkp6QqUMN8vGIuSjjsDEhQ6hQa0"
  //     );
  //     const data = await response.json();
  //     console.log("Fetched Candidate Data:", data?.data?.jd_resume_list);

  //     // ✅ **Find the candidate by ID**
  //     const filteredCandidate = data?.data?.jd_resume_list?.find(
  //       (c) => String(c.id) === String(candidateID) // Ensure proper ID comparison
  //     );

  //     console.log("Filtered Candidate:", filteredCandidate);
  //     setCandidate(filteredCandidate || null);
  //   } catch (error) {
  //     console.error("Error fetching candidate details:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (candidateID) {
  //     fetchCandidateData();
  //   }
  // }, [candidateID]);

  // ✅ **Loader UI (Lucide Loader)**
 

  // ✅ **Candidate Not Found UI**
  if (!candidateData) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Candidate not found
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
      {/* Candidate Avatar */}
      <Avatar className="w-24 h-24 mr-6">
        <AvatarImage src={candidateData?.image || "/default-avatar.png"} alt={candidateData?.name} />
        <AvatarFallback>{candidateData?.name?.charAt(0)?.toUpperCase() || "?"}</AvatarFallback>
      </Avatar>

      {/* Candidate Information */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold">Candidate Profile</h2>
        <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
          <p><strong>Name:</strong> {candidateData?.name || "N/A"}</p>
          <p><strong>Job Type:</strong> {candidateData?.job_type || "N/A"}</p>
          <p><strong>Role:</strong> {candidateData?.role || "N/A"}</p>
          <p><strong>Location:</strong> {candidateData?.location || "N/A"}</p>
          <p><strong>Industry:</strong> {candidateData?.industry || "N/A"}</p>
          <p><strong>Job Level:</strong> {candidateData?.job_level || "N/A"}</p>
          <p><strong>Salary:</strong> {candidateData?.salary || "N/A"}</p>
          <p><strong>Experience:</strong> {candidateData?.expirence || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
