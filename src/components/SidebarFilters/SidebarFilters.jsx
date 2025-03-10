'use client';
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

const SidebarFilters = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
  
    const handleCheckboxChange = (option) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [option]: !prev[option],
      }));
    };
  
    return (
      <aside className="w-full md:w-1/4 bg-white p-6 shadow-md rounded-lg">
        <Input placeholder="Bangalore, India" className="mb-4 w-full border rounded-lg px-3 py-2" />
        {[
          { title: "Industry", options: ["All", "Software", "Finance", "Recruiting", "Management", "Advertising"], counts: [180, 12, 19, 23, 23, 23] },
          { title: "Popular Keyword", options: ["Software", "Developer", "Web"], counts: [180, 12, 19] },
          { title: "Position", options: ["Senior", "Junior", "Fresher"], counts: [23, 45, 67] },
          { title: "Job Posted", options: ["All", "1 day", "7 days", "30 days"], counts: [23, 45, 67, 67] },
          { title: "Job Type", options: ["Full Time", "Part Time", "Remote Jobs", "Freelancer"], counts: [23, 45, 67, 67] },
        ].map((filter, index) => (
          <div key={index} className="mb-6">
            <h4 className="font-semibold text-sm mb-2">{filter.title}</h4>
            <div className="flex flex-col gap-2">
              {filter.options.map((option, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={option.toLowerCase()}
                      checked={!!selectedFilters[option]}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={option.toLowerCase()} className="text-sm cursor-pointer">
                      {option}
                    </label>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">{filter.counts[i]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </aside>
    );
  };
  

  export default SidebarFilters;