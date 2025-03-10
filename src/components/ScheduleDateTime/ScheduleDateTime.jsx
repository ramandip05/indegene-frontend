"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ScheduleDateTime = () => {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-full  mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Schedule Date & Time</h2>

      {/* Main Row Layout */}
      <div className="flex justify-between items-center space-x-6">
        
        {/* Date Picker Section */}
        <div className="flex flex-col items-start">
          <p className="text-gray-700 font-medium mb-2">Select Date</p>
          <div className="border rounded-lg p-2">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </div>

        {/* Time Picker Section */}
        <div className="flex flex-col items-start">
          <p className="text-gray-700 font-medium mb-2">Available Slots</p>
          <div className="border p-3 rounded-lg flex items-center gap-2">
            <Input
              type="number"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              min="1"
              max="12"
              className="w-14 text-center"
            />
            :
            <Input
              type="number"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              min="0"
              max="59"
              className="w-14 text-center"
            />
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col space-y-3">
          <Button className="bg-blue-500 hover:bg-blue-600 w-48">Confirm Interview</Button>
          <Button className="bg-blue-300 hover:bg-blue-400 w-48 text-black">Re-Schedule</Button>
        </div>

        {/* Rating Section */}
        <div className="text-center">
          <p className="text-gray-700 font-medium mb-2">Rating</p>
          <div className="bg-gray-200 text-2xl font-bold w-16 h-16 flex items-center justify-center rounded-full">
            7<span className="text-sm">/10</span>
          </div>
        </div>

        {/* Result Section */}
        <div className="flex space-x-3">
          <Button className="bg-green-500 hover:bg-green-600 text-white">Clear</Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white">Fail</Button>
          <Button className="bg-green-700 hover:bg-green-800 text-white">Salary Discussion</Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDateTime;




