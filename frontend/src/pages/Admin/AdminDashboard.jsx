import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaPrint, FaUserCheck } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 🔹 Hardcoded data (can be fetched from backend later)
  const adminData = {
    totalRMOs: 12,
    nameplatesToPrint: 48,
    verifyRMOs: 5,
  };

  // 🔹 Each stat now includes a route
  const stats = [
    {
      id: 1,
      name: "Total RMOs",
      value: adminData.totalRMOs,
      icon: <FaUserShield className="text-indigo-500 text-3xl sm:text-4xl" />,
      bg: "from-indigo-100 to-indigo-50",
      route: "totalrmo", 
    },
    {
      id: 2,
      name: "Nameplates to Print",
      value: adminData.nameplatesToPrint,
      icon: <FaPrint className="text-green-500 text-3xl sm:text-4xl" />,
      bg: "from-green-100 to-green-50",
      route: "printnameplates", 
    },
    {
      id: 3,
      name: "Verify RMOs",
      value: adminData.verifyRMOs,
      icon: <FaUserCheck className="text-orange-500 text-3xl sm:text-4xl" />,
      bg: "from-orange-100 to-orange-50",
      route: "verifyrmo", 
    },
  ];

  return (
    <div className="w-full min-h-screen  text-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <button
            key={stat.id}
            onClick={() => navigate(stat.route)}
            className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between 
                       transition-all duration-300 hover:shadow-lg hover:scale-[1.02] 
                       text-left w-full"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full bg-linear-to-br ${stat.bg} shadow`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-700">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">Till Date</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
