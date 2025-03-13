"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const CandidateInfo = () => {
  const [offerAccepted, setOfferAccepted] = useState(null);
  const candidate = {
    name: "Amruth",
    role: "UI/UX Designer",
    jobID: "12ERFCSD",
    salary: "7L",
    industry: "IT",
    jobType: "Full Time",
    jobLevel: "Experienced",
    experience: "1 - 2 years",
    image: "/default-avatar.png",
  };
  const barData = [
    { name: "Current Salary", value: 4 },
    { name: "Offered Salary", value: 6 },
    { name: "Expected Salary", value: 8 },
  ];

  const pieData = [
    { name: "2 years", value: 30 },
    { name: "3 years", value: 40 },
    { name: "4 years", value: 30 },
  ];

  const interviewData = [
    { name: "7 Rounds", value: 75 },
    { name: "6 Rounds", value: 60 },
    { name: "5 Rounds", value: 45 },
  ];

  const radarData = [
    { subject: "Figure", value: 80 },
    { subject: "New Research", value: 85 },
    { subject: "Match", value: 75 },
    { subject: "Information Architecture", value: 70 },
    { subject: "Data Structuring", value: 90 },
  ];

  return (
    <div className="w-full mx-auto p-8 bg-white shadow-lg rounded-xl space-y-8">
   {/* Candidate Details */}
      <h2 className="text-3xl font-bold text-gray-800">Candidate Details</h2>
      <div className="flex flex-wrap gap-10 items-center">
        <Avatar className="w-28 h-28">
          <AvatarImage src={candidate.image} alt={candidate.name} />
          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-4 text-gray-700 text-base w-full max-w-4xl">
          <p><strong>Name:</strong> {candidate.name}</p>
          <p><strong>Industry:</strong> {candidate.industry}</p>
          <p><strong>Role:</strong> {candidate.role}</p>
          <p><strong>Job Type:</strong> {candidate.jobType}</p>
          <p><strong>Job ID:</strong> {candidate.jobID}</p>
          <p><strong>Job Level:</strong> {candidate.jobLevel}</p>
          <p><strong>Salary:</strong> {candidate.salary}</p>
          <p><strong>Experience:</strong> {candidate.experience}</p>
        </div>
      </div>

   
      

      {/* Charts Section */}
      <div className="w-full mx-auto p-8 bg-white shadow-lg rounded-xl space-y-8">

      {/* Metrics and Bar Chart Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Metrics Section */}
        <div className="col-span-1 grid grid-cols-2 gap-4 text-lg">
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
            <span className="text-xl font-bold">30</span>
            <p className="text-sm text-gray-600">Notice Period (days)</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
            <span className="text-xl font-bold">2</span>
            <p className="text-sm text-gray-600">Total Tenure</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
            <span className="text-xl font-bold">0.8</span>
            <p className="text-sm text-gray-600">Average Tenure</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
            <span className="text-xl font-bold">14 CTC</span>
            <p className="text-sm text-gray-600">Allocated</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
            <span className="text-xl font-bold">8 CTC</span>
            <p className="text-sm text-gray-600">Offered</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
            <span className="text-xl font-bold">6 CTC</span>
            <p className="text-sm text-gray-600">Saved</p>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="col-span-2 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-center">Salary</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="p-6 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-center">Company Retention</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#10B981" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#4F46E5", "#10B981", "#F59E0B"][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Circular Chart */}
        <div className="p-6 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-center">Interview Review</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={interviewData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#6366F1" label>
                {interviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#6366F1", "#A78BFA", "#818CF8"][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="p-6 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-center">Skills Match</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Skills" dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
   

      {/* Offer Section */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">Offer Accepted</h3>
        <div className="flex justify-center space-x-6">
          <Button
            className="bg-green-500 px-6 py-2 text-lg"
            onClick={() => setOfferAccepted(true)}
          >
            Yes
          </Button>
          <Button
            className="bg-red-500 px-6 py-2 text-lg"
            onClick={() => setOfferAccepted(false)}
          >
            No
          </Button>
        </div>
        {offerAccepted !== null && (
          <p className="text-xl font-semibold">
            {offerAccepted ? "Offer Accepted!" : "Offer Declined."}
          </p>
        )}
      </div>

      {/* CTC Breakdown */}
      <div className="p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">CTC Breakdown</h3>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <p>Basic Salary</p> <p>6 LPA</p>
          <p>House Rent Allowance</p> <p>2 LPA</p>
          <p>Medical Allowance</p> <p>1 LPA</p>
          <p>Bonus</p> <p>1 LPA</p>
          <p className="font-semibold">Total CTC</p> <p className="font-semibold">10 LPA</p>
        </div>
        <Button className="bg-blue-500 w-full mt-4">Save</Button>
      </div>

      {/* Document Processing */}
      <div className="text-center mt-8">
        <Button className="bg-indigo-600 w-full px-8 py-3 text-lg">
          Initiate Document Process
        </Button>
      </div>
    </div>
  );
};

export default CandidateInfo;