import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaIdBadge, FaClipboardList, FaBoxes } from "react-icons/fa";
import "../../index.css";

const VerifyLots = () => {
  const navigate = useNavigate();

  // 🔹 Hardcoded lot data
  const lots = [
    {
      id: 1,
      officerName: "Rahul Sharma",
      officerId: "OFF123",
      lotName: "Lot A",
      totalNameplates: 4,
    },
    {
      id: 2,
      officerName: "Sneha Patel",
      officerId: "OFF124",
      lotName: "Lot B",
      totalNameplates: 5,
    },
    {
      id: 3,
      officerName: "Amit Deshmukh",
      officerId: "OFF125",
      lotName: "Lot C",
      totalNameplates: 3,
    },
  ];

  return (
    <div className="w-full min-h-screen  text-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Verify Lots</h1>
        
      </div>

      {/* Lots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {lots.map((lot) => (
          <div
            key={lot.id}
            onClick={() => navigate(`${lot.id}`)}
            className="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100 
            hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer"
          >
            {/* Officer Info */}
            <div className="flex items-center gap-2 mb-3">
              <FaUser className="text-blue-500" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {lot.officerName}
                <span className="text-gray-600 text-sm"> ({lot.officerId})</span>
              </h2>
            </div>

            

            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <FaBoxes className="text-black" />
              <span className="font-medium">{lot.lotName}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <FaClipboardList className="text-black" />
              <span>Total Nameplates: {lot.totalNameplates}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifyLots;
