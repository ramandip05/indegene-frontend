"use client";

import CandidateProfile from "@/components/CandidateProfile/CandidateProfile.";
import ScheduleInter from "@/components/Schedule/ScheduleInterview";
import ScheduleDateTime from "@/components/ScheduleDateTime/ScheduleDateTime";
import ScheduleInterview from "@/components/ScheduleInterview/ScheduleInterview";
import { Loader2 } from "lucide-react";
// import candidateData from "@/data/candidateData";
// import jobs from "@/data/jobData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CandidateProfilePage = () => {
  const { slug } = useParams();
  console.log("slug",slug)
  const [jobID, name]=slug
  const decodedName = decodeURIComponent(name);
  const [candidateData,setCandidateData] = useState([])
  const [interviewDetails,setInterviewDetails]=useState([])
  const [loading, setLoading] = useState(true); // Loader state
  const [candidateId,setCandidateId] = useState(null)
  const fetchCandidateData = async () => {
    try {
      setLoading(true); // Start loading
      console.log("Fetching candidate details...");
      const response = await fetch(
        `https://prod-25.centralindia.logic.azure.com:443/workflows/8f93a8db429342f98940923564f04dca/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yhG5QSyuCV-5dLEfsGpuUbWR9kGjfz63XXhmeVtl9SM&jd_id=${jobID}&name=${decodedName}`
      );
      const data = await response.json();
      console.log("Fetched Data:", data);

      setCandidateData(data?.data?.candidate_data || []);
      setInterviewDetails(data?.data?.candidate_interview_list || [])
      setCandidateId(data?.data?.candidate_data[0]?.candidate_id)
      // Modify candidate data by adding name and score
      // const updatedCandidates = (data?.data?.jd_resume_list || []).map(
      //   (candidate, index) => ({
      //     ...candidate,
      //  // Assign from list
      //     score: candidate?.ai_score || Math.floor(Math.random() * 30) + 50, // Random score between 50-80
      //   })
      // );

      // setCandidates(updatedCandidates);
    } catch (error) {
      console.error("Error fetching candidate details:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  // ✅ **UseEffect to trigger the POST request first**
  useEffect(() => {
    fetchCandidateData();
  }, [jobID,decodedName]);
console.log("interviewDetails1",interviewDetails)
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
        <span className="ml-3 text-gray-700 text-lg">Fetching Candidate Details...</span>
      </div>
    );
  }
  return (
    <div className="w-full mx-auto p-6 space-y-6">
      {/* Candidate Profile */}
      <CandidateProfile candidateData={candidateData[0]} />

      {/* Schedule Interview */}
      {/* <ScheduleInterview interviewDetails={interviewDetails}/> */}

      {/* Schedule Date and Time */}
      <ScheduleInter candidateID={candidateId} name={decodedName} interviewDetails={interviewDetails}/>
      {/* <ScheduleDateTime candidateID={candidateId} name={decodedName} interviewDetails={interviewDetails}/> */}
    </div>
  );
};

export default CandidateProfilePage;