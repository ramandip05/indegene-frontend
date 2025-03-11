"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JobInfo from "@/components/JobInfo/JobInfo";
import JobCandidates from "@/components/JobCandidates/JobCandidates";
import { Loader2 } from "lucide-react"; // Import loader icon

const JobDetails = () => {
  const { jobID } = useParams();
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [candidates, setCandidates] = useState([]);

  // Predefined list of names (for cases where API doesn't return a name)
  const candidateNames = [
    "Amruth", "Achal", "Anmol", "Ahana", "Shruti",
    "Rohan", "Meera", "Karthik", "Priya", "Arjun"
  ];

  const fetchJobData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(
        "https://prod-10.centralindia.logic.azure.com:443/workflows/7872db48cf6241d089d4629b3dce2539/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Dl1C8HB77eoqGo2Svkp6QqUMN8vGIuSjjsDEhQ6hQa0"
      );
      const data = await response.json();
      console.log("Fetched Data:", data);

      setJobData(data?.data?.jd?.value || []);

      // Modify candidate data by adding name and score
      const updatedCandidates = (data?.data?.jd_resume_list || []).map(
        (candidate, index) => ({
          ...candidate,
          name: candidate?.candidate_name || candidateNames[index] || `Candidate ${index + 1}`, // Assign from list
          score: candidate?.ai_score || Math.floor(Math.random() * 30) + 50, // Random score between 50-80
        })
      );

      setCandidates(updatedCandidates);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  const job = jobData.find((j) => j.Jd_id === jobID);

  console.log("Candidates:", candidates);

  return (
    <div className="w-full mx-auto p-6">
      {loading ? (
        // **Loader UI**
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
          <span className="ml-3 text-gray-700 text-lg">Loading Job Details...</span>
        </div>
      ) : job ? (
        // **Job Details UI**
        <>
          <JobInfo job={job} />
          {/* Pass updated candidates to JobCandidates */}
          <JobCandidates candidates={candidates} jobID={jobID} />
        </>
      ) : (
        // **Job Not Found Message**
        <div className="text-center text-red-500 text-lg mt-10">
          Job not found
        </div>
      )}
    </div>
  );
};

export default JobDetails;


