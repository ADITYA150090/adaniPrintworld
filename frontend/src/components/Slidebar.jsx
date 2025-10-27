import React, { useState } from "react";
import {
  FaGaugeHigh,          // dashboard icon
  FaUser,               // profile icon
  FaArrowRightFromBracket, // toggle + logout icon
  FaCubes,  
       // lots icon
} from "react-icons/fa6";
import {  IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 1, name: "Dashboard", icon: <FaGaugeHigh />, active: true },
    { id: 2, name: "Lots", icon: <FaCubes />, active: false },
    { id: 3, name: "Profile", icon: <FaUser />, active: false },
  ];

  return (
   <div
  className={`${
    isOpen ? "w-60" : "w-20"
  } bg-white/70 backdrop-blur-md border border-white/20 shadow-xl my-5 h-[94vh] flex flex-col justify-between p-4 rounded-3xl transition-all duration-500`}
>

      {/* Top Section */}
      <div>
        {/* Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-all"
          >
            <IoIosArrowForward
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
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-gray-700 font-medium transition-all duration-300 ${
                item.active
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

      {/* Logout Button */}
      <div className="flex justify-center md:justify-start">
        <button className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300">
          <FaArrowRightFromBracket className="text-gray-600 text-lg" />
          {isOpen && <span className="text-sm text-gray-700">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;