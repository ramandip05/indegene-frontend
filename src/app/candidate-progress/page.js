"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Set headers for each tab's data
const inProgressHeaders = ["Employee Name", "Role", "Job ID", "Candidate ID", "Internal", "Job Type", "Matching Jobs", "Experience", "CTC", "status"];
const rejectedHeaders = ["Name", "Score", "Feedback", "Matching Job"];
const completedHeaders = ["Name", "Job Level", "Job ID",  "Experience", "Role", "Expected Salary", "Internal", "Documents"];

// Dummy data for each tab
const inProgressData = [
  { employeename: "Neha Mehta", role: "Digital Marketing Specialist", expectedsalary: "8 LPA", jobtype: "Permanent", matchingjobs: "JD090", experience: "4 years", jobid: "JD010", candidateid: "C010", ctc: "6 LPA", status: "Waiting for Response", internal: "YES" },
  { employeename: "Rohit Sharma", role: "Software Engineer", expectedsalary: "7.5 LPA", jobtype: "Permanent", matchingjobs: "JD010", experience: "0 years", jobid: "JD013", candidateid: "C013", ctc: "0 LPA", status: "Awaiting Interview", internal: "YES" },
  { employeename: "Purushotham S", role: "Frontend Developer", expectedsalary: "5 LPA", jobtype: "Part-time", matchingjobs: "JD080", experience: "4 years", jobid: "JD003", candidateid: "C014", ctc: "4 LPA", status: "In 2nd Round", internal: "NO" },
  { employeename: "Anil Kumar N.N.", role: "Digital Marketing Specialist", expectedsalary: "15 LPA", jobtype: "Permanent", matchingjobs: "JD093", experience: "5 years", jobid: "JD010", candidateid: "C015", ctc: "11 LPA", status: "Interview Scheduled", internal: "YES" },
];

const rejectedData = [
  { name: "Dharani S", score: 65, feedback: "Rejected due to low score", matchingjob: "JD898" },
  { name: "Jaydeep Upadhyay", score: 72, feedback: "Good potential but another candidate selected", matchingjob: "JD92" },
  { name: "Sreeja", score: 58, feedback: "Lack of experience in required field", matchingjob: "JD657 " },
];

const completedData = [
  { name: "Gopikrishnan RK", joblevel: "Junior", experience: "3 years", role: "Frontend Developer", expectedsalary: "₹4 LPA", internal: "NO", documents: "Completed", jobid: "JD003" },
  { name: "Rahul Kumar", joblevel: "Senior", experience: "7 years", role: "Cloud Architect", expectedsalary: "₹8 LPA", internal: "NO", documents: "Pending", jobid: "JD007" },
  { name: "Ajinkya Deshmukh", joblevel: "Associate", experience: "7 years", role: "Azure Developer", expectedsalary: "₹16 LPA", internal: "YES", documents: "Completed", jobid: "JD011" },
  { name: "Bs Mounika", joblevel: "Mid-Level", experience: "4 years", role: "Full Stack Developer", expectedsalary: "₹10 LPA", internal: "YES", documents: "Completed", jobid: "JD012" },
  { name: "Mayank Joshi", joblevel: "Associate", experience: "2 years", role: "Frontend Developer", expectedsalary: "₹12 LPA", internal: "YES", documents: "Pending", jobid: "JD003" },
];

// Table Component to Display Data
const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-4 text-left font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="p-4">
                  {row[header.toLowerCase().replace(" ", "")] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CandidateProgress = () => {
  const router = useRouter(); // Moved inside the functional component
  const [activeTab, setActiveTab] = useState("inProgress"); // State to track the active tab

  const navigateToMainProgress = () => {
    router.push('/');
  };

  // Conditionally render the table based on active tab
  const renderTable = () => {
    switch (activeTab) {
      case "inProgress":
        return <Table headers={inProgressHeaders} data={inProgressData} />;
      case "rejected":
        return <Table headers={rejectedHeaders} data={rejectedData} />;
      case "completed":
        return <Table headers={completedHeaders} data={completedData} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-end">
        <Button onClick={navigateToMainProgress} className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
          HR Dashboard
        </Button>
      </div>
      <div className="flex space-x-6 border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("inProgress")}
          className={`text-lg font-semibold ${activeTab === "inProgress" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"} py-2 px-4`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`text-lg font-semibold ${activeTab === "rejected" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"} py-2 px-4`}
        >
          Rejected
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`text-lg font-semibold ${activeTab === "completed" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"} py-2 px-4`}
        >
          Completed
        </button>
      </div>

      {/* Content for the selected tab */}
      <div className="mt-6">
        {renderTable()} {/* Dynamically render table based on the active tab */}
      </div>
    </div>
  );
};

export default CandidateProgress;