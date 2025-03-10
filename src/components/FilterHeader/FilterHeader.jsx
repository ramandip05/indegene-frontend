"use client"

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const FilterHeader = () => {
    return (
      <div className="flex justify-between items-center py-4 border-b border-gray-300">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold">Advance Filter</h3>
          <button className="text-blue-600 text-sm font-medium">Reset</button>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-gray-500 text-sm">
            Showing <strong className="text-black">41-60</strong> of <strong className="text-black">944</strong> jobs
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-gray-500 text-sm">Show: 1 ▼</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>1</DropdownMenuItem>
              <DropdownMenuItem>10</DropdownMenuItem>
              <DropdownMenuItem>25</DropdownMenuItem>
              <DropdownMenuItem>50</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-gray-500 text-sm">Sort by: <strong>Newest Post ▼</strong></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Newest Post</DropdownMenuItem>
              <DropdownMenuItem>Oldest Post</DropdownMenuItem>
              <DropdownMenuItem>Relevance</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };
  export default FilterHeader