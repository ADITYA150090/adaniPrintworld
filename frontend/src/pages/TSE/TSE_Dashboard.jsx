import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaClipboardList,
  FaUserCheck
} from "react-icons/fa";

import "../../index.css";

const TSEDashboard = () => {
  const navigate = useNavigate();

  const User = {
    TE_id: "TSE_Head_01",
    totalOfficers: 15,
    pendingLots: 9,
    verifyofficer: 4,
  };

  const stats = [
    {
      id: 1,
      name: "Total Officers",
      value: User.totalOfficers,
      icon: <FaUsers className="text-blue-500 text-2xl sm:text-3xl" />,
      color: "from-blue-100 to-blue-50",
      route: "totalofficers",
    },
    {
      id: 2,
      name: "Pending Lots",
      value: User.pendingLots,
      icon: <FaClipboardList className="text-yellow-500 text-2xl sm:text-3xl" />,
      color: "from-yellow-100 to-yellow-50",
      route: "pendinglots",
    },
    {
      id: 3,
      name: "Verify Officers",
      value: User.verifyofficer,
      icon: <FaUserCheck className="text-green-500 text-2xl sm:text-3xl" />,
      color: "from-green-100 to-green-50",
      route: "VerifyOfficers",
    },
  ];

  return (
    <div className="w-full min-h-screen text-gray-900 p-4 sm:p-6 md:p-10">

      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          Technical Senior Executive Dashboard
        </h1>
        <span className="text-gray-700 text-sm sm:text-base">{User.TE_id}</span>
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
