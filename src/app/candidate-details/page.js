"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CandidateDetails = () => {
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

  const receivedDocuments = [
    "Aadhaar Card",
    "Pan Card",
    "Appraisal Letter",
    "Experience Letter",
    "Oct Payslip",
    "Nov Payslip",
    "Dec Payslip",
  ];

  const [rejectedDocuments, setRejectedDocuments] = useState([
    { name: "Aadhaar Card", file: null },
    { name: "Pan Card", file: null },
  ]);

  // Handle file upload
  const handleFileUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedDocuments = [...rejectedDocuments];
      updatedDocuments[index].file = URL.createObjectURL(file);
      setRejectedDocuments(updatedDocuments);
    }
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto space-y-10">
      {/* Candidate Details Section */}
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

      {/* Received Documents Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Received Documents</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
          {receivedDocuments.map((doc, index) => (
            <Card key={index} className="shadow-md border rounded-lg w-40 h-44 flex flex-col items-center justify-center text-sm text-gray-600 p-4">
              <CardContent className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gray-200 rounded-md"></div>
                <p className="mt-3 text-center font-medium">{doc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Rejected Documents Section with File Upload */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Rejected Documents</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
          {rejectedDocuments.map((doc, index) => (
            <Card key={index} className="shadow-md border rounded-lg w-40 h-52 flex flex-col items-center justify-between text-sm text-gray-600 p-4">
              <CardContent className="flex flex-col items-center">
                {doc.file ? (
                  <img src={doc.file} alt={doc.name} className="w-28 h-28 rounded-md object-cover" />
                ) : (
                  <div className="w-28 h-28 bg-gray-200 rounded-md"></div>
                )}
                <p className="mt-3 text-center font-medium">{doc.name}</p>
              </CardContent>
              {/* Upload Button */}
              <div className="w-full flex justify-center mb-3">
                {/* Hidden File Input */}
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  id={`file-upload-${index}`}
                  onChange={(e) => handleFileUpload(e, index)}
                />
                <label
                  htmlFor={`file-upload-${index}`}
                  className="cursor-pointer bg-blue-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Upload Again
                </label>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center mt-8">
        <Button className="bg-blue-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-600">
          Final Submission
        </Button>
      </div>
    </div>
  );
};

export default CandidateDetails;
