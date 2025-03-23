"use client";

import CandidateHeader from "@/components/CandidateHeader/CandidateHeader";
import CareerProgression from "@/components/CareerProgression/CareerProgression";
import InsightsGrid from "@/components/InsightsGrid/InsightsGrid";
import MetricsGrid from "@/components/MetricsGrid/MetricsGrid";
import SkillAnalysis from "@/components/SkillAnalysis/SkillAnalysis";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";


const CandidateAssessment = () => {
    const { candidateID } = useParams();
   
   const [candidateAssesment,setCandidateAssesment] = useState(null)
    const [loading, setLoading] = useState(true); 
      const fetchCandidateAssesment = async () => {
        try {
          setLoading(true); // Start loading
          console.log("Fetching candidate details...");
          const response = await fetch(
            `https://prod-20.centralindia.logic.azure.com:443/workflows/6cfd5a33510a42d890551481e1169e21/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9oM1MecRcpUarD0wiHh4wS4CpCMw9AS9aN-YC_suzRM&candidate_id=${candidateID}`
          );
          const data = await response.json();
          console.log("Fetched Data:", data);
    
          setCandidateAssesment(data?.data[0] || null);
        
    
          // setCandidates(updatedCandidates);
        } catch (error) {
          console.error("Error fetching candidate details:", error);
        } finally {
          setLoading(false); // Stop loading after fetching
        }
      };
    
      // ✅ **UseEffect to trigger the POST request first**
      useEffect(() => {
        fetchCandidateAssesment();
      },[candidateID])
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <main className="flex flex-col p-8 bg-gray-50 min-h-[screen] max-md:p-6 max-sm:p-4">
        <CandidateHeader candidateAssesment={candidateAssesment}/>
        <section className="flex flex-col gap-8">
          <CareerProgression candidateAssesment={candidateAssesment}/>
          <MetricsGrid candidateAssesment={candidateAssesment}/>
          <SkillAnalysis candidateAssesment={candidateAssesment}/>
          <InsightsGrid candidateAssesment={candidateAssesment}/>
        </section>
      </main>
    </>
  );
};

export default CandidateAssessment;