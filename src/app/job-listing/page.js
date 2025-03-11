"use client"
import { useEffect, useState } from "react";
import FilterHeader from "@/components/FilterHeader/FilterHeader";
import JobCard from "@/components/JobCard/JobCard";
import JobPagination from "@/components/JobPagination/JobPagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import SidebarFilters from "@/components/SidebarFilters/SidebarFilters";
import { Loader2 } from "lucide-react"; // Import a spinner icon from Lucide

const JobListing = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loader

  const fetchJobData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(
        "https://prod-27.centralindia.logic.azure.com/workflows/c3e89a02a59f4f14b1ff1980369ce628/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=v403rCUoe-WX_tiRy_KHqhloyOqj4bwz3lqgZj19xu8"
      );
      const data = await response.json();
      console.log("data", data);
      setJobData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  return (
    <div className="p-6 w-full">
      <SearchBar />
      <FilterHeader />
      <div className="flex gap-6 mt-6">
        {/* Sidebar Filters Placeholder */}
        <SidebarFilters />
        
        <div className="flex-1">
          {loading ? (
            // Show Loader when fetching data
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
              <span className="ml-3 text-gray-700 text-lg">Loading Jobs...</span>
            </div>
          ) : jobData.length === 0 ? (
            // Show message if no jobs found
            <p className="text-center text-gray-500">No jobs available.</p>
          ) : (
            // Show Job Listings
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobData.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        {/* Pagination Placeholder */}
        <JobPagination />
      </div>
    </div>
  );
};

export default JobListing;
