'use client';
;
import { FaSearch } from 'react-icons/fa';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
  
    const handleSearch = () => {
      onSearch({ searchTerm, selectedStatus, selectedIndustry, selectedLocation });
    };
  
    return (
      <div className="flex items-center gap-4 bg-[#f5f9ff] p-4 rounded-2xl shadow-md w-full max-w-4xl mx-auto mt-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white shadow px-4 py-2 rounded-lg flex items-center gap-2">
              {/* <span className="w-2 h-2 bg-green-500 rounded-full"></span> */}
              {selectedStatus || 'Job Status'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedStatus('Active')}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('Inactive')}>Inactive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex flex-grow items-center bg-white shadow px-4 py-2 rounded-lg gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-gray-600">{selectedIndustry || 'Industry'}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["Software", "Finance", "Recruiting", "Management", "Advertising"].map((industry) => (
                <DropdownMenuItem key={industry} onClick={() => setSelectedIndustry(industry)}>{industry}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
  
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-gray-600">{selectedLocation || 'Location'}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["United States", "India", "United Kingdom", "Germany", "Australia"].map((location) => (
                <DropdownMenuItem key={location} onClick={() => setSelectedLocation(location)}>{location}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Input 
            placeholder="Your keyword..." 
            className="border-none focus:ring-0 flex-grow text-gray-600" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
  
        <Button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
          <FaSearch /> Search
        </Button>
      </div>
    );
  };

  export default SearchBar