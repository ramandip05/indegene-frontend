import { useState } from "react";

const ScheduleInterview = () => {
  const [rounds, setRounds] = useState([1, 2, 3]);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Schedule Interview</h2>
      <div className="flex gap-3">
        {rounds.map((round) => (
          <button
            key={round}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
