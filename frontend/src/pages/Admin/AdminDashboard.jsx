import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserShield, FaPrint, FaUserCheck } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Admin Dashboard Data
  useEffect(() => {
    const token = localStorage.getItem("token"); // stored when logged in

    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:10000/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setAdminData({
        totalHeads: res.data.data.totalHeads,
        totalOfficers: res.data.data.totalOfficers,
        pendingOfficers: res.data.data.pendingOfficers
      });
      setLoading(false);
    })
    .catch(err => {
      setError("Unauthorized or session expired. Please login again.");
      setLoading(false);
      setTimeout(() => navigate("/login"), 1500);
    });
  }, [navigate]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

  // Stats Cards with correct values
  const stats = [
    {
      id: 1,
      name: "Total Heads",
      value: adminData.totalHeads,
      icon: <FaUserShield className="text-indigo-500 text-3xl sm:text-4xl" />,
      bg: "from-indigo-100 to-indigo-50",
      route: "totalRMO", 
    },
    {
      id: 2,
      name: "Total Officers",
      value: adminData.totalOfficers,
      icon: <FaPrint className="text-green-500 text-3xl sm:text-4xl" />,
      bg: "from-green-100 to-green-50",
      route: "total-officers", 
    },
    {
      id: 3,
      name: "Pending Officers",
      value: adminData.pendingOfficers,
      icon: <FaUserCheck className="text-orange-500 text-3xl sm:text-4xl" />,
      bg: "from-orange-100 to-orange-50",
      route: "pending-officers", 
    },
  ];

  return (
    <div className="w-full min-h-screen text-gray-900 p-4 sm:p-6 md:p-10">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
      </div>

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
              <div className={`p-3 rounded-full bg-linear-to-br ${stat.bg} shadow`}>
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
