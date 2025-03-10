"use client";

import CandidateProfile from "@/components/CandidateProfile/CandidateProfile.";
import ScheduleDateTime from "@/components/ScheduleDateTime/ScheduleDateTime";
import ScheduleInterview from "@/components/ScheduleInterview/ScheduleInterview";
import candidateData from "@/data/candidateData";
import jobs from "@/data/jobData";
import { useParams } from "next/navigation";

const CandidateProfilePage = () => {
  const { jobID, candidateID } = useParams();

  // Find job and candidate from jobID and candidateID
  const job = jobs.find((j) => j.jobId === Number(jobID));
  if (!job) return <div className="text-center text-red-500 text-lg mt-10">Job not found</div>;

  const candidate = candidateData.find((c) => c.candidateID === candidateID);
  if (!candidate) return <div className="text-center text-red-500 text-lg mt-10">Candidate not found</div>;
  
  return (
    <div className="w-full mx-auto p-6 space-y-6">
      {/* Candidate Profile */}
      <CandidateProfile candidate={candidate}  />

      {/* Schedule Interview */}
      <ScheduleInterview />

      {/* Schedule Date and Time */}
      <ScheduleDateTime />
    </div>
  );
};

export default CandidateProfilePage;

