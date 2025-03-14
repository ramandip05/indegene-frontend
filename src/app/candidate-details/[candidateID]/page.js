"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const CandidateDetails = () => {
  const { candidateID } = useParams();
  // const candidate = {
  //   name: "Amruth",
  //   role: "UI/UX Designer",
  //   jobID: "12ERFCSD",
  //   salary: "7L",
  //   industry: "IT",
  //   jobType: "Full Time",
  //   jobLevel: "Experienced",
  //   experience: "1 - 2 years",
  //   image: "/default-avatar.png",
  // };
 const [candidateDetails,setCandidateDetails] = useState(null)
  const [loading, setLoading] = useState(true); 
    const fetchCandidateData = async () => {
      try {
        setLoading(true); // Start loading
        console.log("Fetching candidate details...");
        const response = await fetch(
          `https://prod-07.centralindia.logic.azure.com:443/workflows/85cfeb76a9ad4dda80d514641662554e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vFkwXNhC_xAGCLuYu0yUBk2Hl-CtH8wLihBSxRHVCH0&candidate_id=${candidateID}`
        );
        const data = await response.json();
        console.log("Fetched Data:", data);
  
        setCandidateDetails(data?.data?.candidate_details[0] || null);
        // setCandidateCTC(data?.data?.candidate_ctc[0] || null);
        // setInterviewData(data?.data?.interview || [])
        // setInterviewDetails(data?.data?.candidate_interview_list || [])
        // setCandidateId(data?.data?.candidate_data[0]?.candidate_id)
        // Modify candidate data by adding name and score
        // const updatedCandidates = (data?.data?.jd_resume_list || []).map(
        //   (candidate, index) => ({
        //     ...candidate,
        //  // Assign from list
        //     score: candidate?.ai_score || Math.floor(Math.random() * 30) + 50, // Random score between 50-80
        //   })
        // );
  
        // setCandidates(updatedCandidates);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };
  
    // ✅ **UseEffect to trigger the POST request first**
    useEffect(() => {
      fetchCandidateData();
    },[candidateID])
  const receivedDocuments = [
    { name: "Aadhaar Card", image: "/images/Aadhar.png" },
    { name: "Pan Card", image: "/images/Pan.jpeg" },
    { name: "Appraisal Letter", image: "/images/appraisal.png" },
    { name: "Experience Letter", image: "/images/Experience_Letter.png" },
    { name: "Oct Payslip", image: "/images/Payslip.png" },
    { name: "Nov Payslip", image: "/images/Payslip.png" },
    { name: "Dec Payslip", image: "/images/Payslip.png" },
  ];

  const [rejectedDocuments, setRejectedDocuments] = useState([
    { name: "Aadhaar Card", file: null },
    { name: "Pan Card", file: null },
  ]);

  const [showPopup, setShowPopup] = useState(false); // Popover State

  // Handle file upload (using dummy image)
  const handleFileUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedDocuments = [...rejectedDocuments];
      updatedDocuments[index].file = "/dummy-upload.png"; // Dummy image
      setRejectedDocuments(updatedDocuments);
    }
  };
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
        <span className="ml-3 text-gray-700 text-lg">Fetching Candidate Details...</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 shadow-md rounded-lg w-full mx-auto space-y-10">
      {/* Candidate Details Section */}
      <h2 className="text-3xl font-bold text-gray-800">Candidate Details</h2>
      <div className="flex flex-wrap gap-10 items-center">
        <Avatar className="w-28 h-28">
          <AvatarImage src={candidateDetails?.image} alt={candidateDetails?.name} />
          <AvatarFallback>{candidateDetails?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-4 text-gray-700 text-base w-full max-w-4xl">
          <p><strong>Name:</strong> {candidateDetails?.name}</p>
          <p><strong>Industry:</strong> {candidateDetails?.industry}</p>
          <p><strong>Role:</strong> {candidateDetails?.role}</p>
          <p><strong>Job Type:</strong> {candidateDetails?.jobType}</p>
          <p><strong>Job ID:</strong> {candidateDetails?.jobID}</p>
          <p><strong>Job Level:</strong> {candidateDetails?.jobLevel}</p>
          <p><strong>Salary:</strong> {candidateDetails?.salary}</p>
          <p><strong>Experience:</strong> {candidateDetails?.experience}</p>
        </div>
      </div>

      {/* Received Documents Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Received Documents</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
          {receivedDocuments.map((doc, index) => (
            <Card key={index} className="shadow-md border rounded-lg w-40 h-52 flex flex-col items-center justify-center text-sm text-gray-600 p-4">
              <CardContent className="flex flex-col items-center">
                <img src={doc.image} alt={doc.name} className="w-28 h-28 rounded-md object-cover" />
                <p className="mt-3 text-center font-medium">{doc.name}</p>
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
            <Card key={index} className="shadow-md border rounded-lg w-40 h-52 flex flex-col items-center justify-between text-sm text-gray-600 p-2">
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
        <Button
          className="bg-blue-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-600 cursor-pointer"
          onClick={() => setShowPopup(true)} // Open Popover on Click
        >
          Final Submission
        </Button>
      </div>

      {/* Popover Modal */}
      {showPopup && (
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                🎉 Congratulations!
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-700 mt-4">The process is completed successfully.</p>
            <Button
              className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              onClick={() => setShowPopup(false)}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CandidateDetails;
