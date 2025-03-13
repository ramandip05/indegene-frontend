"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";

const ScheduleDateTime = ({ candidateID, name ,interviewRound, totalRounds,interviewDetails }) => {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("0");
  const [openPopover, setOpenPopover] = useState(null);
  const [selectedResult, setSelectedResult] = useState("");
  const [roundId,setRoundId]=useState(null)
console.log("interviewDetails1",interviewDetails)
  // Format minutes to "01, 02, 03"
  const handleMinuteChange = (e) => {
    let value = e.target.value.padStart(2, "0");
    if (Number(value) > 59) value = "59";
    setMinute(value);
  };
  const handleRatingChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    value = Math.max(0, Math.min(10, value)); // Constrain within 0-10
    setRating(value.toString());
  };
  // ✅ **Confirm Interview API Call**
  const handleConfirmInterview = async () => {
    if (!date) {
      toast.error("Please select an interview date.");
      return;
    }

    const formattedDate = format(date, "yyyy-MM-dd");
    const interviewTime = `${hour}:${minute} ${period}`;

    const payload = {
      interview_date: formattedDate,
      interview_time: interviewTime,
      interview_confirmation: "scheduled",
      interview_round: interviewRound,
      candidate_id: candidateID,
      name:name
    };

    console.log("Submitting Interview Payload:", payload);

    try {
      setLoading(true);
      const response = await fetch(
        "https://prod-22.centralindia.logic.azure.com:443/workflows/d6e152685435489bb447347c84c75969/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cdnjdS9PZD5YMqQyZphq2YthoJefbnyjCAT3cfdLRZg",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.status) {
        throw new Error("Failed to schedule interview.");
      }
      const result = await response.json(); // Convert response to JSON
      console.log("API Response:", result);

      setRoundId(result?.data?.interview_list_id)
      toast.success("Interview scheduled successfully!", {
        duration: 1000,
        style: { backgroundColor: "#28a745", color: "white" }, // Green background
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to schedule interview.", {
        duration: 1000,
        style: { backgroundColor: "#dc3545", color: "white" }, // Red background
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ **Save Feedback API Call**
  const handleSaveFeedback = async (roundId) => {
    console.log("roundId",roundId)
    if (!feedback.trim()) {
      toast.error("Please enter feedback.");
      return;
    }

    const payload = {
      rating: String(rating),
      feedback,
      interview_result: selectedResult === "Clear" ? String(1): String(0),
      id: roundId,
    };

    console.log("Submitting Feedback Payload:", payload);

    try {
      setLoading(true);
      const response = await fetch(
        "https://prod-20.centralindia.logic.azure.com:443/workflows/20a6ad9d4a3a4ca89aecf7f9f2bfb178/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z4sSeY5CeHx1owl9CUqn3Qtn14Dr4BUNGlO2X8bkoi0",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.status) {
        throw new Error("Failed to submit feedback.");
      }

      toast.success("Feedback saved successfully!", {
        duration: 1000,
        style: { backgroundColor: "#28a745", color: "white" }, // Green
      });
      setOpenPopover(null);
      setFeedback("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save feedback.", {
        duration: 1000,
        style: { backgroundColor: "#dc3545", color: "white" }, // Red
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-start">Schedule Date & Time</h2>

      {/* ✅ Headings Row */}
      <div className="grid grid-cols-4 gap-6 text-center text-black font-semibold mb-2">
        <p>Select Date</p>
        <p>Available Slots</p>
        <p>Rate out of 10</p>
        <p>Result</p>
      </div>

      {/* ✅ Main Layout */}
      <div className="grid grid-cols-4 gap-6 items-center">
        {/* Date Picker */}
        <div className="flex flex-col items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-40 py-2 border-gray-300">
                {date ? format(date, "PP") : "--/--/----"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="start"
              sideOffset={6}
              className="p-2 shadow-lg border bg-white rounded-lg max-h-40 overflow-y-auto"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => setDate(selectedDate)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Picker */}
        <div className="flex flex-col items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-40 py-2 border-gray-300">
                {hour}:{minute} {period}
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="p-1 shadow-lg border bg-white rounded-lg w-52">
              <div className="flex items-center space-x-2">
                <Input type="number" value={hour} onChange={(e) => setHour(e.target.value.padStart(2, "0"))} className="w-16 text-center border" />
                :
                <Input type="number" value={minute} onChange={handleMinuteChange} className="w-16 text-center border" />
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-16"><SelectValue>{period}</SelectValue></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center">
          <Input type="number" value={rating} onChange={handleRatingChange} className="bg-gray-200 text-2xl font-bold w-20 h-16 text-center rounded-full border" />
        </div>

        {/* Result (Clear/Fail with Feedback) */}
        <div className="flex flex-col items-center space-y-3">
          {["Clear", "Fail"].map((type) => (
            <Popover key={type} open={openPopover === type} onOpenChange={(isOpen) => { if (isOpen) { setOpenPopover(type); setSelectedResult(type); } else { setOpenPopover(null); } }}>
              <PopoverTrigger asChild>
                <Button className={`bg-${type === "Clear" ? "green" : "red"}-500 cursor-pointer text-white w-40`}>{type}</Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 shadow-lg border bg-white rounded-lg w-60">
                <Input type="text" placeholder={`Enter feedback...`} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                <Button className="bg-blue-500 text-white w-full mt-2" onClick={()=>handleSaveFeedback(roundId)}>Save</Button>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>

      {/* ✅ Confirm & Reschedule Buttons */}
      <div className="mt-6 flex gap-6 justify-center">
        <Button className="bg-blue-500 hover:bg-blue-600 w-48 cursor-pointer" onClick={handleConfirmInterview} disabled={loading}>{loading ? "Scheduling..." : "Confirm Interview"}</Button>
        <Button className="bg-blue-300 hover:bg-blue-400 w-48 text-black cursor-pointer">Re-Schedule</Button>
      </div>
    </div>
  );
};

export default ScheduleDateTime;
