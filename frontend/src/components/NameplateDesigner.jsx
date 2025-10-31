import React, { useState } from "react";
import { User, Home, MapPin, Palette, ChevronLeft, ChevronRight } from "lucide-react";

const NameplateDesigner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("theme");
  const [theme, setTheme] = useState("Ambuja");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [houseName, setHouseName] = useState("");

  // Replace with your actual images
  const images = [
    { id: 1, url: "/images/d1 (1).webp" },
    { id: 2, url: "/images/d2 (1).webp" },
    { id: 3, url: "/images/d3 (1).webp" },
    { id: 4, url: "/images/d4 (1).webp" }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = () => {
    console.log({
      theme,
      name,
      address,
      houseName,
      selectedImage: images[currentIndex].url,
    });
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-6 md:py-8">
      {/* Nameplate Preview with Navigation Arrows */}
      <div className="relative w-full max-w-[700px] aspect-[1.47] flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-1 md:left-2 bg-white/60 hover:bg-white/80 text-black rounded-full p-1.5 md:p-2 shadow-md z-10"
        >
          <ChevronLeft size={20} className="md:w-7 md:h-7" />
        </button>

        {/* Nameplate Preview */}
        <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-gray-300">
          <img
            src={images[currentIndex].url}
            alt="Selected Template"
            className="w-full h-full object-cover"
          />
          {/* Dynamic Texts */}
          <p className="absolute top-10 md:top-10 right-5 md:right-18 text-white text-sm md:text-lg font-semibold drop-shadow-md">
            {houseName}
          </p>
          <p className="absolute inset-0 flex justify-center items-center text-xl md:text-3xl font-bold text-white drop-shadow-lg px-4 text-center">
            {name}
          </p>
          <p className="absolute bottom-10 md:bottom-10 inset-x-0 text-center text-white text-sm md:text-lg drop-shadow-md px-4">
            {address}
          </p>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-1 md:right-2 bg-white/60 hover:bg-white/80 text-black rounded-full p-1.5 md:p-2 shadow-md z-10"
        >
          <ChevronRight size={20} className="md:w-7 md:h-7" />
        </button>
      </div>

      {/* Designer Controls */}
      <div className="bg-white/80 mt-4 md:mt-6 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg w-full max-w-[700px]">
        {activeTab === "theme" && (
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <h3 className="font-medium text-sm md:text-base">Select Theme</h3>
            <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
              <button
                onClick={() => setTheme("Ambuja")}
                className={`px-4 md:px-5 py-2 rounded-xl border text-sm md:text-base ${
                  theme === "Ambuja"
                    ? "bg-gray-300 border-gray-400"
                    : "bg-white border-gray-300"
                }`}
              >
                Ambuja
              </button>
              <button
                onClick={() => setTheme("ACC")}
                className={`px-4 md:px-5 py-2 rounded-xl border text-sm md:text-base ${
                  theme === "ACC"
                    ? "bg-gray-300 border-gray-400"
                    : "bg-white border-gray-300"
                }`}
              >
                ACC
              </button>
            </div>
          </div>
        )}

        {activeTab === "name" && (
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <label className="font-medium text-sm md:text-base">Enter Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 rounded-xl p-2 w-full md:w-3/4 text-center text-sm md:text-base"
              placeholder="Enter your name"
            />
          </div>
        )}

        {activeTab === "address" && (
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <label className="font-medium text-sm md:text-base">Enter Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-400 rounded-xl p-2 w-full md:w-3/4 text-center text-sm md:text-base"
              placeholder="Enter your address"
            />
          </div>
        )}

        {activeTab === "house" && (
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <label className="font-medium text-sm md:text-base">Enter House Name</label>
            <input
              type="text"
              value={houseName}
              onChange={(e) => setHouseName(e.target.value)}
              className="border border-gray-400 rounded-xl p-2 w-full md:w-3/4 text-center text-sm md:text-base"
              placeholder="Enter your house name"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className={`${activeTab === "house" ? "block" : "hidden"} mt-4 md:mt-6 flex justify-center`}>
          <button
            onClick={handleSubmit}
            className="bg-gray-900 text-white px-5 md:px-6 py-2 rounded-xl hover:bg-gray-700 transition-all text-sm md:text-base"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-center gap-2 md:gap-4 mt-4 md:mt-6 bg-white/80 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-md flex-wrap">
        <button
          onClick={() => setActiveTab("theme")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm ${
            activeTab === "theme" ? "bg-gray-300" : "bg-white"
          }`}
        >
          <Palette size={16} className="md:w-[18px] md:h-[18px]" /> Theme
        </button>
        <button
          onClick={() => setActiveTab("name")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm ${
            activeTab === "name" ? "bg-gray-300" : "bg-white"
          }`}
        >
          <User size={16} className="md:w-[18px] md:h-[18px]" /> Name
        </button>
        <button
          onClick={() => setActiveTab("address")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm ${
            activeTab === "address" ? "bg-gray-300" : "bg-white"
          }`}
        >
          <MapPin size={16} className="md:w-[18px] md:h-[18px]" /> Address
        </button>
        <button
          onClick={() => setActiveTab("house")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm ${
            activeTab === "house" ? "bg-gray-300" : "bg-white"
          }`}
        >
          <Home size={16} className="md:w-[18px] md:h-[18px]" /> House Name
        </button>
      </div>
    </div>
  );
};

export default NameplateDesigner;