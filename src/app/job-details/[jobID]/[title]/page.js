"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JobInfo from "@/components/JobInfo/JobInfo";
import JobCandidates from "@/components/JobCandidates/JobCandidates";
import { Loader2 } from "lucide-react"; // Import loader icon

const JobDetails = () => {
  const { jobID,title } = useParams();
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [candidates, setCandidates] = useState([]);
  const decodedTitle = decodeURIComponent(title);
  // Predefined list of names (for cases where API doesn't return a name)
  const candidateNames = [
    "Amruth", "Achal", "Anmol", "Ahana", "Shruti",
    "Rohan", "Meera", "Karthik", "Priya", "Arjun"
  ];
console.log(jobID)
  // ✅ **Function to make POST request before fetching job details**
  const postJobData = async () => {
    try {
      console.log("Posting job data...");
      const response = await fetch(
        "https://prod-12.centralindia.logic.azure.com:443/workflows/0945646ee9f544de97bf6dce98793b2e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8Wg3RTj9ifyrBI8NyfX_CeZjCZGfDDU3uOelMVwrjTc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // "jd_link": "https://skysecuretech.sharepoint.com/:b:/s/test/EbAAl9F7eEdGs9_U62TVQOMBBkMnMuQ9x_ccK9zOnDu3fw?e=pNgzzg",
            "jd_id": jobID,
            "jd_title": decodedTitle
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post job data");
      }

      console.log("Job data posted successfully.");

      // ✅ **Wait for 40 seconds before fetching job details**
      setTimeout(fetchJobData, 40000); // 40 seconds delay
    } catch (error) {
      console.error("Error posting job data:", error);
      setLoading(false);
    }
  };

  // ✅ **Function to fetch job data**
  const fetchJobData = async () => {
    try {
      setLoading(true); // Start loading
      console.log("Fetching job details after 40 seconds...");
      const response = await fetch(
        `https://prod-10.centralindia.logic.azure.com:443/workflows/7872db48cf6241d089d4629b3dce2539/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Dl1C8HB77eoqGo2Svkp6QqUMN8vGIuSjjsDEhQ6hQa0&jd_id=${jobID}`
      );
      const data = await response.json();
      console.log("Fetched Data:", data);

      setJobData(data?.data?.jd_description || []);

      // Modify candidate data by adding name and score
      const updatedCandidates = (data?.data?.jd_resume_list || []).map(
        (candidate, index) => ({
          ...candidate,
       // Assign from list
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

  // ✅ **UseEffect to trigger the POST request first**
  useEffect(() => {
    postJobData();
  }, [jobID]);

  const job = jobData.find((j) => j.jd_id === jobID);

  console.log("Candidates:", candidates);

  return (
    <div className="w-full mx-auto p-6">
      {loading ? (
        // **Loader UI**
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
          <span className="ml-3 text-gray-700 text-lg">Processing Job Details...</span>
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
