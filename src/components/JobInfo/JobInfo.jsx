import { useState } from "react";
import { Briefcase, Clock } from "lucide-react";

const JobInfo = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
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
  return (
    <div>
      <h1 className="text-2xl font-bold">{job.title}</h1>
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
      <p className="text-gray-500 mt-2">
        <span className="text-sm ">Job ID</span> <strong>{job.jd_id}</strong>
      </p>
      {/* <p className="text-gray-500 text-sm mt-1">🕒 {job.Job_type} • {job.Posted_time}</p> */}
      {/* <p className="text-gray-500  text-sm mt-1">Job ID - <b>{job.Jd_id}</b></p> */}
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">Employment Information</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
          <p><strong>Industry:</strong> {job.industry_type}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Allocated Budget:</strong> {job.allocated_budget}</p>
          <p><strong>Job Level:</strong> {job.job_level}</p>
          <p><strong>Job Type:</strong> {job.job_type}</p>
          <p><strong>Experience:</strong> {job.expirence_required}</p>
        </div>
      </div>

      {/* Job Description with Toggle */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Job Description</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          {showFullDescription ? job.description : `${job.description.substring(0, 250)}... `}
          <span 
            className="text-blue-600 cursor-pointer font-semibold"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? " View Less" : " View More"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobInfo;

  