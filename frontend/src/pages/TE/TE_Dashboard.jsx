import React, { useEffect, useState } from "react";
import { getOfficerDashboard } from "../../api";
import Sidebar from "../../components/Slidebar";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaCheckDouble,
  FaPlus,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "../../index.css";

const TEDashboard = () => {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getOfficerDashboard();
        console.log("Dashboard Response:", response);

        // handle both: { success, data: {...} } OR just {...}
        const payload = response.data?.data || response.data;

        if (!payload) {
          setError("Failed to fetch data");
          return;
        }

        // backend: totalLots, pendingNameplates, approvedNameplates
        // frontend UI: unverified, verified
        setUser({
          ...payload,
          unverified: payload.pendingNameplates ?? 0,
          verified: payload.approvedNameplates ?? 0,
        });
      } catch (err) {
        setError(err.message || "Server Error");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading lots...</p>
      </div>
    );

  if (error)
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-900 text-white">
        Error: {error}
      </div>
    );

  return (
    <div className="w-full min-h-screen text-gray-900 p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">
          Technical Executive Dashboard
        </h1>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            id: 1,
            name: "Unverified",
            value: User?.unverified || 0,
            icon: <FaClock className="text-red-500 text-3xl" />,
            color: "from-red-100 to-red-50",
          },
          {
            id: 2,
            name: "Verified",
            value: User?.verified || 0,
            icon: <FaCheckCircle className="text-green-500 text-3xl" />,
            color: "from-green-100 to-green-50",
          },
          {
            id: 3,
            name: "On Transit",
            value: User?.ontransit || 0,
            icon: <FaTruck className="text-yellow-500 text-3xl" />,
            color: "from-yellow-100 to-yellow-50",
          },
          {
            id: 4,
            name: "Delivered",
            value: User?.delivered || 0,
            icon: <FaCheckDouble className="text-blue-500 text-3xl" />,
            color: "from-blue-100 to-blue-50",
          },
        ].map((stat) => (
          <div
            key={stat.id}
            className={` bg-white shadow-lg rounded-2xl p-5 flex items-center justify-between transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 bg-linear-to-br ${stat.color} rounded-full shadow`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-700">{stat.name}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">Till Date</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <Link to="lots">
          <div className="bg-gray-400 hover:bg-gray-500 transition-all duration-300 rounded-2xl p-6 flex justify-between items-center shadow-lg">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Show Lots</h2>
              <p className="text-md text-white">Create new Lots</p>
            </div>
            <div className="bg-white p-4 rounded-full shadow">
              <FaPlus className="text-purple-600 text-2xl" />
            </div>
          </div>
        </Link>
        <div className="bg-amber-100 hover:bg-amber-200 transition-all duration-300 rounded-2xl p-6 flex justify-between items-center shadow-lg">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              Track your Order
            </h2>
            <p className="text-sm text-gray-600">See your delivery status</p>
          </div>
          <div className="bg-white p-4 rounded-full shadow">
            <FaMapMarkerAlt className="text-amber-700 text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TEDashboard;
