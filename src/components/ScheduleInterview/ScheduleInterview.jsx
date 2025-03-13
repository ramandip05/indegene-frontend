import { useState } from "react";

const ScheduleInterview = ({interviewDetails}) => {
  const [rounds, setRounds] = useState([1, 2, 3]);
  const [activeRound, setActiveRound] = useState(0); // ✅ Default active round

  console.log("interviewDetails",interviewDetails)
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Schedule Interview</h2>
      <div className="flex gap-3">
        {rounds.map((round) => (
          <button
            key={round}
            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
              round < activeRound
                ? "bg-green-500 hover:bg-green-600 cursor-pointer" // ✅ Completed Rounds (Green)
                : round === activeRound
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" // ✅ Current Active Round (Blue)
                : round === activeRound + 1
                ? "bg-gray-400 text-black hover:bg-gray-500 cursor-pointer" // ✅ Next Round (Gray but clickable)
                : "bg-gray-300 text-gray-500 cursor-not-allowed" // ✅ Future rounds are disabled
            }`}
            onClick={() => {
              if (round <= activeRound + 1) setActiveRound(round); // ✅ Can only go to current or next round
            }}
          >
            Round {round}
          </button>
        ))}
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          onClick={() => setRounds([...rounds, rounds.length + 1])}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ScheduleInterview;

