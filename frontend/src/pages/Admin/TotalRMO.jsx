import React, { useEffect, useState } from "react";
import { FaUserTie, FaIdBadge } from "react-icons/fa";
import axios from "axios";

const TotalRMO = () => {
  const [heads, setHeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHeads = async () => {
    try {
      const token = localStorage.getItem("token"); // must exist
      const res = await axios.get("http://localhost:10000/admin/heads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHeads(res.data.heads || []);
    } catch (error) {
      console.error("Error fetching heads:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeads();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-700 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Total RMOs (Heads)
        </h1>
      </div>

      {/* RMO Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {heads.map((head) => (
          <div
            key={head._id}
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
                {head.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                <FaIdBadge size={14} className="text-gray-500" />
                <span className="font-medium">{head.tseId ?? "N/A"}</span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                📍 {head.district || "Unknown"} - {head.pincode || ""}
              </p>

              <p
                className={`text-xs mt-2 font-semibold ${
                  head.isVerified ? "text-green-600" : "text-orange-600"
                }`}
              >
                {head.isVerified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {heads.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No RMOs found.
        </div>
      )}
    </div>
  );
};

export default TotalRMO;
