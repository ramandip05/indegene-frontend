"use client";
import { useState } from "react";
 
const PaySearchFilter = ({ title }) => {
  // States for dropdowns
  const [role, setRole] = useState("Select Role");
  const [experience, setExperience] = useState("Select Experience");
  const [location, setLocation] = useState("Select Location");
 
  // State to store the search result
  const [result, setResult] = useState(null);
 
  const handleSearch = () => {
    // Display the selected filter values as the result
    setResult(`Searching for Role: ${role}, Experience: ${experience}, Location: ${location}`);
  };
 
  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full max-w-lg mx-auto flex flex-col space-y-4"> {/* Increased width here */}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <div className="flex items-center space-x-4">
        {/* Role Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Role</option>
            <option>Software Engineer</option>
            <option>UI/UX Designer</option>
            <option>Project Manager</option>
          </select>
        </div>
 
        {/* Experience Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Experience</option>
            <option>0 - 1 year</option>
            <option>1 - 3 years</option>
            <option>3 - 5 years</option>
            <option>5+ years</option>
          </select>
        </div>
 
        {/* Location Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Location</option>
            <option>New York</option>
            <option>San Francisco</option>
            <option>London</option>
            <option>Berlin</option>
          </select>
        </div>
 
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white py-2 px-6 rounded-md flex items-center space-x-2 hover:bg-blue-700"
        >
          <span>🔍</span>
          <span>Search</span>
        </button>
      </div>
 
      {/* Result Box */}
      <div className={`mt-4 p-6 border rounded-lg ${result ? "bg-white" : "bg-gray-100"} flex items-center justify-center h-24`}>
        {result ? result : "No data to display. Apply the filters and click 'Search'."}
      </div>
    </div>
  );
};
 
const CandidateProfile = () => {
  return (
    <div className="space-y-10">
      <div className="flex justify-between space-x-6">
        {/* Market Pay Scale Search Bar */}
        <PaySearchFilter title="Market Pay Scale" />
 
        {/* Internal Pay Parity Search Bar */}
        <PaySearchFilter title="Internal Pay Parity" />
      </div>
    </div>
  );
};
 
export default CandidateProfile;