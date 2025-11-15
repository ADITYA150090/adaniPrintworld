import React from "react";
import { FaUserTie, FaIdBadge } from "react-icons/fa";

const TotalRMO = () => {
  // 🔹 Hardcoded RMO data (replace with backend data later)
  const RMOs = [
    { id: 1, name: "Rohit Deshmukh", rmoId: "RMO001" },
    { id: 2, name: "Sneha Patil", rmoId: "RMO002" },
    { id: 3, name: "Amit Joshi", rmoId: "RMO003" },
    { id: 4, name: "Priya Mehta", rmoId: "RMO004" },
  ];

  return (
    <div className="w-full min-h-screen  text-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Total RMOs
        </h1>
       
      </div>

      {/* RMO Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {RMOs.map((rmo) => (
          <div
            key={rmo.id}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 
                       hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            {/* Icon */}
            <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full">
              <FaUserTie className="text-3xl" />
            </div>

            {/* RMO Info */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {rmo.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                <FaIdBadge size={14} className="text-gray-500" />
                <span className="font-medium">{rmo.rmoId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {RMOs.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No RMOs found.
        </div>
      )}
    </div>
  );
};

export default TotalRMO;
