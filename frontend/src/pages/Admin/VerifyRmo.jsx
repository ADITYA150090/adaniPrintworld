import React from "react";
import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

const VerifyRMO = () => {
  // 🔹 Hardcoded RMO data (replace with backend fetch later)
  const pendingRMOs = [
    {
      id: 1,
      name: "Rohit Deshmukh",
      email: "rohit.deshmukh@example.com",
      phone: "+91 9876543210",
      tseId: "TSE001",
      company: "ACC",
      address: "Plot 45, Ring Road, Nagpur, Maharashtra",
    },
    {
      id: 2,
      name: "Sneha Patil",
      email: "sneha.patil@example.com",
      phone: "+91 9823456780",
      tseId: "TSE002",
      company: "Ambuja",
      address: "Flat 10B, Kalyani Nagar, Pune, Maharashtra",
    },
    {
      id: 3,
      name: "Amit Joshi",
      email: "amit.joshi@example.com",
      phone: "+91 9945632109",
      tseId: "TSE003",
      company: "ACC",
      address: "Sector 12, Vashi, Mumbai, Maharashtra",
    },
  ];

  // 🧩 Dummy Approve / Reject actions
  const handleApprove = (name) => {
    alert(`✅ ${name} has been approved as RMO.`);
  };

  const handleReject = (name) => {
    alert(`❌ ${name} has been rejected.`);
  };

  return (
    <div className="w-full min-h-screen  text-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Verify RMOs
        </h1>
    
      </div>

      {/* RMO Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingRMOs.map((rmo) => (
          <div
            key={rmo.id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between 
                       hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                <FaUserTie className="text-3xl" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {rmo.name}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                  <FaIdBadge size={14} />
                  <span>{rmo.tseId}</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col gap-2 text-sm text-gray-700 mb-4">
              <div className="flex items-center gap-2">
                <FaEnvelope size={14} className="text-gray-500" />
                <span>{rmo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone size={14} className="text-gray-500" />
                <span>{rmo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBuilding size={14} className="text-gray-500" />
                <span>{rmo.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={14} className="text-gray-500" />
                <span>{rmo.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-auto pt-3">
              <button
                onClick={() => handleApprove(rmo.name)}
                className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-all"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(rmo.name)}
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-all"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {pendingRMOs.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No pending RMOs for verification.
        </div>
      )}
    </div>
  );
};

export default VerifyRMO;
