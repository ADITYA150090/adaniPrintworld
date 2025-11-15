import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Slidebar";
 import { Grid3x3, User, ClipboardList } from "lucide-react";
import { FaUsers } from "react-icons/fa";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const TSEItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <Grid3x3 size={20} />,
    path: "",
  },
  {
    id: "RMOs",
    name: "RMOs",
    icon: <FaUsers size={20} />,
    path: "totalRMO",
  },
  {
    id: "Nameplates",
    name: "Nameplates",
    icon: <ClipboardList size={20} />,
    path: "printnameplates",
  },
  {
    id: "profile",
    name: "Profile",
    icon: <User size={20} />,
    path: "profile",
  },
];

  return (
    <div className="dash flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        items={TSEItems}
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

export default AdminLayout;
