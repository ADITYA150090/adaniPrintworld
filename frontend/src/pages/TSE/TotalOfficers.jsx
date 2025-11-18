import React, { useEffect, useState } from "react";
import { FaUserCircle, FaClipboardList, FaIdBadge } from "react-icons/fa";
import "../../index.css";

const TotalOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOfficers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:10000/head/dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      const result = await response.json();

      if (result.success && result.data?.officers) {
        setOfficers(result.data.officers);
      }
    } catch (error) {
      console.error("Error fetching officers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  if (loading) return <p className="p-10 text-lg font-semibold">Loading...</p>;

  return (
    <div className="w-full min-h-screen text-gray-900 p-4 sm:p-6 md:p-10">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Total Officers</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {officers.map((officer) => (
          <div
            key={officer._id}
            className="bg-white rounded-2xl shadow-md p-6 sm:p-7 flex items-center gap-4 border border-gray-100
              hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
          >
            {/* Icon */}
            <div className="shrink-0">
              <FaUserCircle className="text-blue-500 text-5xl sm:text-6xl" />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                {officer.name}
              </h2>

              <p className="text-sm text-gray-600 mb-1">{officer.email}</p>
              <p className="text-sm text-gray-600 mb-1">{officer.number}</p>

              <div className="flex items-center justify-between mt-1">
                {/* Officer ID */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaIdBadge className="text-gray-500" size={14} />
                  <span className="font-medium">{officer.tseId}</span>
                </div>

                {/* Verification Status */}
                <span
                  className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full ${
                    officer.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  <FaClipboardList size={12} />
                  {officer.isVerified ? "Verified" : "Not Verified"}
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
