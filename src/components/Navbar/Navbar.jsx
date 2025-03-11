"use client";

import { FaBell } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-[#f5f9ff] shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link href="/">
        <Image 
          src="/images/indegene-logo.png" 
          alt="Indegene" 
          width={120} 
          height={40} 
          // priority={true} // ✅ Add this to ensure it loads first
          className="h-16 w-auto"
        />
      </Link>

      {/* Right Side - Notification & Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="bg-white p-2 rounded-full shadow-md">
          <FaBell className="text-gray-600" size={18} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md cursor-pointer">
          <Avatar>
            <AvatarImage src="/user.jpg" alt="Aman Singh" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Aman Singh</p>
            <p className="text-xs text-gray-500">Human Resource</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
