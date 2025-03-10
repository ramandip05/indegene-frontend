import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CandidateProfile = ({ candidate }) => {
  console.log("candidate",candidate)
  return (
    <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
      {/* Candidate Avatar */}
      <Avatar className="w-24 h-24 mr-6">
        <AvatarImage src={candidate.image} alt={candidate.name} />
        <AvatarFallback>{candidate.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      {/* Candidate Information */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold">Candidate Profile</h2>
        <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
          <p><strong>Name:</strong> {candidate.name}</p>
          <p><strong>Job Type:</strong> {candidate.jobType}</p>
          <p><strong>Role:</strong> {candidate.role}</p>
          <p><strong>Location:</strong> {candidate.location}</p>
          <p><strong>Industry:</strong> {candidate.industry}</p>
          <p><strong>Job Level:</strong> {candidate.jobLevel}</p>
          <p><strong>Expected Salary:</strong> {candidate.expectedSalary}</p>
          <p><strong>Experience:</strong> {candidate.experience}</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;

  