'use client';
import { Briefcase, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useRouter } from 'next/navigation';
const JobCard = ({ job }) => {
    const router = useRouter();
    const formatTimeAgo = (timestamp) => {
      const postedDate = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor((now - postedDate) / 1000);
      
      if (diffInSeconds < 60) {
          return `${diffInSeconds} seconds ago`;
      } 
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
          return `${diffInMinutes} minutes ago`;
      }
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
          return `${diffInHours} hours ago`;
      }
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
  };
 
  const handleClick = (jobID, title) => {
    
    console.log("hitt", "jobID", jobID);

    const encodedJobID = encodeURIComponent(jobID);
    const encodedTitle = encodeURIComponent(title);

    router.push(`/job-details/${encodedJobID}/${encodedTitle}`);
};
    return (
      <Card className="shadow-lg border rounded-lg p-4 bg-[#f5f9ff]">
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">{job?.title}</h3>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {job?.job_status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-gray-500 mt-2">
        <div className="flex items-center gap-1">
          <Briefcase className="w-3 h-3" />
          <span className="text-sm">{job.job_type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span className="text-sm">{formatTimeAgo(job.posted_time)}</span>
        </div>
      </div>
          {/* <p className="text-sm text-gray-500 flex items-center gap-1">
            <span>🕒 {job?.job_type}</span> • <span>{job?.posted_time}</span>
          </p> */}
          <p className="mt-2 text-gray-700 text-sm leading-relaxed tracking-normal text-justify">{job?.jd_description}</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            {job?.skills?.split(", ").map((skill, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{skill}</span>
            ))}
          </div>
          <Button variant="link" className="mt-3 text-blue-600 cursor-pointer" onClick={()=>handleClick(job?.jd_id,job?.title)}>View more</Button>
        </CardContent>
      </Card>
    );
  };

  export default JobCard;