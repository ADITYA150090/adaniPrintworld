import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "../../index.css";

const ApproveOfficers = () => {
  // 🔹 Hardcoded officer data
  const [officers, setOfficers] = useState([
    {
      id: 1,
      fullName: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      mobile: "+91 9876543210",
      address: "Plot No. 45, Shivaji Nagar, Nagpur",
      status: "Pending",
    },
    {
      id: 2,
      fullName: "Sneha Patel",
      email: "sneha.patel@example.com",
      mobile: "+91 9823456780",
      address: "Sector 12, Pratap Nagar, Nagpur",
      status: "Pending",
    },
    {
      id: 3,
      fullName: "Amit Deshmukh",
      email: "amit.deshmukh@example.com",
      mobile: "+91 9932456781",
      address: "Ring Road, Wardha Road, Nagpur",
      status: "Pending",
    },
  ]);

  // ✅ Approve / Reject handler
  const handleAction = (id, action) => {
    setOfficers((prev) =>
      prev.map((officer) =>
        officer.id === id
          ? { ...officer, status: action === "approve" ? "Approved" : "Rejected" }
          : officer
      )
    );
  };

  return (
    <div className="w-full min-h-screen  text-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Approve Officers</h1>
        
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className="bg-white rounded-2xl shadow-md p-6 sm:p-7 border border-gray-100 
            hover:shadow-lg hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Officer Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FaUser className="text-blue-500 text-xl sm:text-2xl" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {officer.fullName}
                </h2>
              </div>

              <div className="flex items-center gap-2 mb-2 text-gray-700 text-sm">
                <FaEnvelope className="text-gray-500" size={14} />
                <span>{officer.email}</span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-gray-700 text-sm">
                <FaPhoneAlt className="text-gray-500" size={14} />
                <span>{officer.mobile}</span>
              </div>

              <div className="flex items-start gap-2 mb-4 text-gray-700 text-sm">
                <FaMapMarkerAlt className="text-red-500 mt-1" size={14} />
                <p className="leading-snug">{officer.address}</p>
              </div>
            </div>

            {/* Action Buttons or Status */}
            {officer.status === "Pending" ? (
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleAction(officer.id, "approve")}
                  className="flex items-center justify-center gap-2 bg-green-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-green-600 transition-all text-sm w-[48%]"
                >
                  <FaCheck /> Approve
                </button>
                <button
                  onClick={() => handleAction(officer.id, "reject")}
                  className="flex items-center justify-center gap-2 bg-red-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-red-600 transition-all text-sm w-[48%]"
                >
                  <FaTimes /> Reject
                </button>
              </div>
            ) : (
              <div
                className={`mt-4 px-4 py-2 text-center rounded-xl font-semibold text-sm sm:text-base ${
                  officer.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {officer.status}
              </div>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default ApproveOfficers;
