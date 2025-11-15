import React from "react";
import { FaUserCircle, FaClipboardList, FaIdBadge } from "react-icons/fa";
import "../../index.css";

const TotalOfficers = () => {
  // 🔹 Hardcoded officer data
  const officers = [
    { id: 1, name: "Rahul Sharma", officerId: "OFF123", pendingLots: 3 },
    { id: 2, name: "Sneha Patel", officerId: "OFF124", pendingLots: 5 },
    { id: 3, name: "Amit Deshmukh", officerId: "OFF125", pendingLots: 2 },
    { id: 4, name: "Priya Mehta", officerId: "OFF126", pendingLots: 4 },
  ];

  return (
    <div className="w-full min-h-screen  text-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Total Officers
        </h1>
       
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className="bg-white rounded-2xl shadow-md p-6 sm:p-7 flex items-center gap-4 border border-gray-100
            hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
          >
            {/* Officer Icon */}
            <div className="shrink-0">
              <FaUserCircle className="text-blue-500 text-5xl sm:text-6xl" />
            </div>

            {/* Officer Details */}
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                {officer.name}
              </h2>

              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaIdBadge className="text-gray-500" size={14} />
                  <span className="font-medium">{officer.officerId}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                  <FaClipboardList size={12} />
                  {officer.pendingLots} Pending
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    
      
    </div>
  );
};

export default TotalOfficers;
