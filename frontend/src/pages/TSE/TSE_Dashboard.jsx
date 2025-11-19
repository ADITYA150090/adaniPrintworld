import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaClipboardList,
  FaUserCheck
} from "react-icons/fa";
import axios from "axios";
import "../../index.css";

const TSEDashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalofficers: 0,
    pendingLots: 0,
    verifyOfficers: 0,
  });

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/head/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const apiData = res.data.data;

      setDashboard({
        totalofficers: apiData.totalOfficers || 0,
        pendingLots: apiData.pendingLots || 0,
        verifyOfficers: apiData.unverifiedOfficers || 0,
      });

    } catch (error) {
      console.log("Dashboard Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats = [
    {
      id: 1,
      name: "Total Officers",
      value: dashboard.totalofficers,
      icon: <FaUsers className="text-blue-500 text-2xl sm:text-3xl" />,
      color: "from-blue-100 to-blue-50",
      route: "totalofficers",
    },
    {
      id: 2,
      name: "Pending Lots",
      value: dashboard.pendingLots,
      icon: <FaClipboardList className="text-yellow-500 text-2xl sm:text-3xl" />,
      color: "from-yellow-100 to-yellow-50",
      route: "pendinglots",
    },
    {
      id: 3,
      name: "Verify Officers",
      value: dashboard.verifyOfficers,
      icon: <FaUserCheck className="text-green-500 text-2xl sm:text-3xl" />,
      color: "from-green-100 to-green-50",
      route: "verifyofficers",
    },
  ];

  return (
    <div className="w-full min-h-screen text-gray-900 p-4 sm:p-6 md:p-10">

      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          Technical Senior Executive Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            onClick={() => navigate(stat.route)}
            className="bg-white shadow-md rounded-xl p-4 sm:p-5 flex items-center justify-between cursor-pointer
            transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`p-2 sm:p-3 bg-linear-to-br ${stat.color} rounded-full shadow`}>
                {stat.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm sm:text-base">{stat.name}</p>
                <p className="text-lg sm:text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">Till Date</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TSEDashboard;
