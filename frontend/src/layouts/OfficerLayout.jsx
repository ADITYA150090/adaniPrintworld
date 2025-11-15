import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Slidebar";
import { User, Grid3x3 } from "lucide-react";
import { FaCubes } from "react-icons/fa6";
const OfficerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const Items = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <Grid3x3 size={20} />,
      path: "/TE/",
    },
    {
      id: "lots",
      name: "Lots",
      icon: <FaCubes size={20} />,
      path: "/TE/lots",
    },
    {
      id: "profile",
      name: "Profile",
      icon: <User size={20} />,
      path: "/TE/profile",
    },
  ];

  return (
    <div className="dash flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        items={Items}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-500 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-4 md:p-6 overflow-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OfficerLayout;
