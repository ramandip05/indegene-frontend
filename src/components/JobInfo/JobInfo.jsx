const JobInfo = ({ job }) => {
    return (
      <div>
        <h1 className="text-4xl font-bold">{job.Title}</h1>
        <p className="text-gray-500">🕒 {job.Job_type} • {job.Posted_time}</p>
  
        <div className="mt-6 bg-white p-6 shadow-md rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Employment Information</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <p><strong>Industry:</strong> {job.Industry_type}</p>
            <p><strong>Location:</strong> {job.Location}</p>
            <p><strong>Allocated Budget:</strong> {job.Allocated_budget}</p>
            <p><strong>Job Level:</strong> {job.Job_level}</p>
            <p><strong>Job Type:</strong> {job.Job_type}</p>
            <p><strong>Experience:</strong> {job.Expirence_level}</p>
          </div>
        </div>
        <div className="mt-6">
        <h2 className="text-xl font-semibold">Job Description</h2>
        {/* <p className="mt-2 text-gray-700 leading-relaxed">
          {job.jd_description.length > 250 ? (
            <>
              {job.jd_description.substring(0, 250)}...
              <span className="text-blue-600 cursor-pointer"> View More</span>
            </>
          ) : (
            job.jd_description
          )}
        </p> */}
      </div>

      </div>
    );
  };
  
  export default JobInfo;
  