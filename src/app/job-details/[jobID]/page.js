"use client";

import JobCandidates from "@/components/JobCandidates/JobCandidates";
import JobInfo from "@/components/JobInfo/JobInfo";
import jobs from "@/data/jobData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const JobDetails = () => {
    const { jobID } = useParams();
    const [jobData,setJobData] = useState([]);
    const fetchJobData=async()=>{
      try{
        const response= await fetch("https://prod-10.centralindia.logic.azure.com:443/workflows/7872db48cf6241d089d4629b3dce2539/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Dl1C8HB77eoqGo2Svkp6QqUMN8vGIuSjjsDEhQ6hQa0")
        const data = await response.json();
        console.log('data',data)
        setJobData(data?.data?.jd?.value)
      }catch(error){
        console.log(error)
      }
    
    }
    useEffect(()=>{
      fetchJobData()
    },[])
//     console.log(jobID)
    const job = jobData.find(j => j.Jd_id === jobID);
console.log("job",job)
    // Handle case where job is not found

    if (!job) {
        return <div className="text-center text-red-500 text-lg mt-10">Job not found</div>;
    }

    return (
      <div className="w-full mx-auto p-6">
         <JobInfo job={job} />
         {/* <JobCandidates candidates={job.candidates} jobID={jobID}/> */}
      </div>
    );
};

export default JobDetails;
