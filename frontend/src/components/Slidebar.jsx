import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, ChevronRight, Menu, X } from "lucide-react";


const Sidebar = ({ isOpen, toggleSidebar ,items=[]}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowMobileSidebar(false);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

 const menuItems = Array.isArray(items) ? items : [];

  

  const activeRoute = location.pathname;
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setShowMobileSidebar(false);
  };

  // ================= MOBILE SIDEBAR =================
  if (isMobile) {
    return (
      <>
        {/* Hamburger Button */}
        <button
          onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          className="fixed top-4 left-4 z-50 p-3 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20"
        >
          {showMobileSidebar ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Overlay */}
        {showMobileSidebar && (
          <div
            className="fixed inset-0  z-40"
            onClick={() => setShowMobileSidebar(false)}
          />
        )}

        {/* Sidebar Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white/70 backdrop-blur-md border-r border-white/20 shadow-xl z-40 transform transition-transform duration-300 ${
            showMobileSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col justify-between h-full p-4 pt-20">
            {/* Menu Items */}
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-700 font-medium transition-all duration-300 ${
                    activeRoute === item.path
                      ? "bg-[#cbc8e8] text-black"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <button
              onClick={() => navigate("/logout")}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300"
            >
              <LogOut size={20} className="text-gray-600" />
              <span className="text-sm text-gray-700">Logout</span>
            </button>
          </div>
        </div>
      </>
    );
  }

  // ================= DESKTOP SIDEBAR =================
  return (
    <div
      className={`${
        isOpen ? "w-60" : "w-20"
      } bg-white/70 backdrop-blur-md border border-white/20 shadow-xl my-5 h-[94vh] flex flex-col fixed justify-between m-4 p-4 rounded-3xl transition-all duration-500`}
    >
      {/* Top Section */}
      <div>
        {/* Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-gray-100 transition-all"
          >
            <ChevronRight
              className={`text-gray-500 text-lg transition-transform duration-500 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-gray-700 font-medium transition-all duration-300 ${
                activeRoute === item.path
                  ? "bg-[#cbc8e8] text-black"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="text-lg">{item.icon}</div>
              {isOpen && <span className="text-sm">{item.name}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="flex justify-center md:justify-start">
        <button
          onClick={() => navigate("/logout")}
          className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300"
        >
          <LogOut size={20} className="text-gray-600" />
          {isOpen && <span className="text-sm text-gray-700">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
