"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Import useEffect
import { Button } from "@/components/ui/button";

// Set headers for each tab's data
const inProgressHeaders = [
  "Employee Name",
  "Role",
  "Job ID",
  "Candidate ID",
  "Internal",
  "Job Type",
  "Matching Jobs",
  "Experience",
  "CTC",
  "status",
];
const rejectedHeaders = ["Name", "Score", "Feedback", "Matching Job"];
const completedHeaders = [
  "Name",
  "Job Level",
  "Job ID",
  "Experience",
  "Role",
  "Expected Salary",
  "Internal",
  "Documents",
];

// Table Component to Display Data
const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-4 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("inProgress");
  const [inProgressData, setInProgressData] = useState([]); // State for In Progress data
  const [rejectedData, setRejectedData] = useState([]); // State for Rejected data
  const [completedData, setCompletedData] = useState([]); // State for Completed data
  const [loading, setLoading] = useState(false); // State to manage loading state

  // Fetch data based on the active tab
  const fetchData = async (status) => {
    try {
      setLoading(true);
      console.log(`Fetching ${status} candidate data`);
      const response = await fetch(
        `https://prod-19.centralindia.logic.azure.com:443/workflows/db6a855095bf4f4c9b3a079cb5ac1aee/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Or92DmumSYalTctUl93F7fqR882Jj0Bl0ZC9dV2P0Wk&status=${status}`
      );
      const data = await response.json();
      console.log("Fetched Data:", data);

      // Transform API data to match the table structure
      const transformedData = data.data.map((candidate) => {
        if (status === "In Progress") {
          return {
            employeename: candidate.name,
            role: candidate.role,
            jobid: candidate.jd_id,
            candidateid: candidate.candidate_id,
            internal: "YES", 
            jobtype: candidate.job_type,
            matchingjobs: candidate.jd_id,
            experience: candidate.expirence,
            ctc: candidate.salary,
            status: candidate.Stage,
          };
        } else if (status === "Rejected") {
          return {
            name: candidate.name,
            score: "-",
            feedback: candidate.Status,
            matchingjob: "-",
          };
        } else if (status === "Completed") {
          return {
            name: candidate.name,
            joblevel: candidate.job_level,
            jobid: candidate.jd_id,
            experience: candidate.expirence,
            role: candidate.role,
            expectedsalary: candidate.salary,
            internal: "YES",
            documents: "Completed", 
          };
        }
        return null;
      });

      // Update the corresponding state based on the status
      if (status === "In Progress") {
        setInProgressData(transformedData);
      } else if (status === "Rejected") {
        setRejectedData(transformedData);
      } else if (status === "Completed") {
        setCompletedData(transformedData);
      }
    } catch (error) {
      console.log(`Error fetching ${status} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the active tab changes
  useEffect(() => {
    if (activeTab === "inProgress") {
      fetchData("In Progress");
    } else if (activeTab === "rejected") {
      fetchData("Rejected");
    } else if (activeTab === "completed") {
      fetchData("Completed");
    }
  }, [activeTab]); // Fetch data whenever the active tab changes

  const navigateToMainProgress = () => {
    router.push("/");
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
        <Button
          onClick={navigateToMainProgress}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          HR Dashboard
        </Button>
      </div>
      <div className="flex space-x-6 border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("inProgress")}
          className={`text-lg font-semibold ${
            activeTab === "inProgress"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          } py-2 px-4`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`text-lg font-semibold ${
            activeTab === "rejected"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          } py-2 px-4`}
        >
          Rejected
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`text-lg font-semibold ${
            activeTab === "completed"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          } py-2 px-4`}
        >
          Completed
        </button>
      </div>

      {/* Content for the selected tab */}
      <div className="mt-6">
        {loading ? <p>Loading Data...</p> : renderTable()}{" "}
        {/* Show loading state or render table */}
      </div>
    </div>
  );
};

export default CandidateProgress;
