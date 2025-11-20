import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Home, MapPin, Palette, ChevronLeft, ChevronRight, Type } from "lucide-react";
import { useParams } from "react-router-dom";
// removed createNameplate import as requested (no API call now)

const TextStyleControls = ({ style, setStyle, fonts, loadFont }) => {
  const colorPalette = [
    { name: "Gold", value: "rgb(255, 215, 0)" },
    { name: "Red", value: "rgb(204, 0, 26)" },
    { name: "White", value: "rgb(255, 255, 255)" },
    { name: "Black", value: "rgb(0, 0, 0)" }
  ];

  return (
    <div className="w-full mt-3 p-3 bg-gray-50 rounded-lg space-y-3">
      {/* Color Palette */}
      <div className="flex items-center gap-2">
        <label className="text-xs md:text-sm font-medium w-20">Color:</label>
        <div className="flex gap-2 flex-wrap">
          {colorPalette.map((color) => (
            <button
              key={color.value}
              onClick={() => setStyle({ ...style, color: color.value })}
              className={`w-10 h-10 rounded-lg border-2 transition-all ${
                style.color === color.value
                  ? "border-blue-500 scale-110"
                  : "border-gray-300 hover:scale-105"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {style.color === color.value && (
                <span className="text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Slider */}
      <div className="flex items-center gap-2">
        <label className="text-xs md:text-sm font-medium w-20">Size:</label>
        <input
          type="range"
          min="12"
          max="60"
          value={style.fontSize}
          onChange={(e) => setStyle({ ...style, fontSize: parseInt(e.target.value) })}
          className="flex-1"
        />
        <span className="text-xs text-gray-600 w-10">{style.fontSize}px</span>
      </div>

      {/* Font Family Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-xs md:text-sm font-medium w-20">Font:</label>
        <select
          value={style.fontFamily}
          onChange={(e) => {
            loadFont(e.target.value);
            setStyle({ ...style, fontFamily: e.target.value });
          }}
          className="flex-1 border border-gray-300 rounded-lg p-1.5 text-xs md:text-sm"
        >
          {fonts.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Bold and Italic Toggles */}
      <div className="flex items-center gap-3">
        <label className="text-xs md:text-sm font-medium w-20">Style:</label>
        <button
          onClick={() =>
            setStyle({
              ...style,
              fontWeight: style.fontWeight === "bold" ? "normal" : "bold",
            })
          }
          className={`px-3 py-1.5 text-xs md:text-sm rounded-lg border font-bold ${
            style.fontWeight === "bold"
              ? "bg-gray-700 text-white border-gray-700"
              : "bg-white border-gray-300"
          }`}
        >
          B
        </button>
        <button
          onClick={() =>
            setStyle({
              ...style,
              fontStyle: style.fontStyle === "italic" ? "normal" : "italic",
            })
          }
          className={`px-3 py-1.5 text-xs md:text-sm rounded-lg border italic ${
            style.fontStyle === "italic"
              ? "bg-gray-700 text-white border-gray-700"
              : "bg-white border-gray-300"
          }`}
        >
          I
        </button>
      </div>
    </div>
  );
};

const NameplateDesigner = () => {
  const { lotno } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("theme");
  const [theme, setTheme] = useState("Ambuja");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [houseName, setHouseName] = useState("");

  // Text styling states for each field
  const [nameStyle, setNameStyle] = useState({
    color: "rgb(255, 255, 255)",
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "normal",
    fontFamily: "Inter"
  });

  const [addressStyle, setAddressStyle] = useState({
    color: "rgb(255, 255, 255)",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "Inter"
  });

  const [houseStyle, setHouseStyle] = useState({
    color: "rgb(255, 255, 255)",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    fontFamily: "Inter"
  });

  const [loadedFonts, setLoadedFonts] = useState(new Set(["Inter"]));

  // store the object locally (you wanted a returned object)
  const [createdNameplate, setCreatedNameplate] = useState(null);

  // NEW: officerId & headId state (try localStorage first)
  const [officerId, setOfficerId] = useState(localStorage.getItem("officerId") || null);
  const [headId, setHeadId] = useState(localStorage.getItem("tseId") || localStorage.getItem("headId") || null);

  // Popular Google Fonts
  const googleFonts = [
    "Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Oswald",
    "Raleway", "Poppins", "Playfair Display", "Merriweather", "Nunito",
    "Ubuntu", "PT Sans", "Crimson Text", "Dancing Script", "Pacifico",
    "Lobster", "Great Vibes", "Righteous", "Bebas Neue", "Shadows Into Light",
    "Abril Fatface", "Anton", "Cinzel", "Cormorant Garamond", "Satisfy"
  ];

  // Theme-based images
  const themeImages = {
    Ambuja: [
      { id: 1, url: "/ambuja/d1.webp" },
      { id: 2, url: "/ambuja/d2.webp" },
      { id: 3, url: "/ambuja/d3.webp" },
      { id: 4, url: "/ambuja/d4.webp" }
    ],
    ACC: [
      { id: 1, url: "/acc/d1.webp" },
      { id: 2, url: "/acc/d2.webp" },
      { id: 3, url: "/acc/d3.webp" },
      { id: 4, url: "/acc/d4.webp" }
    ]
  };

  // Get current images based on selected theme
  const images = themeImages[theme];

  // Load Google Font dynamically
  const loadFont = (fontFamily) => {
    if (!loadedFonts.has(fontFamily)) {
      const link = document.createElement("link");
      link.href = "https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      setLoadedFonts(new Set([...loadedFonts, fontFamily]));
    }
  };

  useEffect(() => {
    loadFont(nameStyle.fontFamily);
    loadFont(addressStyle.fontFamily);
    loadFont(houseStyle.fontFamily);
  }, [nameStyle.fontFamily, addressStyle.fontFamily, houseStyle.fontFamily]);

  // Reset current index when theme changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [theme]);

  // NEW: fetch profile if IDs missing (minimal)
  useEffect(() => {
    const fetchProfileIfNeeded = async () => {
      if ((officerId && headId) || typeof window === "undefined") return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = res.data?.data || res.data;

        const fetchedOfficerId = profile._id ?? profile.officerId ?? null;
        const fetchedHeadId = profile.tseId ?? profile.headId ?? null;

        if (fetchedOfficerId) {
          setOfficerId(fetchedOfficerId);
          localStorage.setItem("officerId", fetchedOfficerId);
        }
        if (fetchedHeadId) {
          setHeadId(fetchedHeadId);
          localStorage.setItem("tseId", fetchedHeadId);
        }
      } catch(err) {
        // non-blocking: just warn
        console.warn("Could not fetch profile for IDs:", err);
      }
    };

    fetchProfileIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once; dependencies intentionally empty to keep minimal

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // ---------- minimal change: build & return object locally (no API) ----------
const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in");
      return;
    }

    const payload = {
      name,
      address,
      houseName,
      theme,
      selectedImage: images[currentIndex].url,
      nameStyle,
      addressStyle,
      houseStyle
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/officer/lot/${lotno}/nameplate`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setCreatedNameplate(res.data.data);

    console.log("Nameplate saved:", res.data.data);
    alert("Nameplate Created Successfully");

    return res.data.data;

  } catch (error) {
    console.error("Error saving nameplate:", error.response?.data || error);
    alert(error.response?.data?.message || "Failed to create nameplate");
  }
};

  // ---------- end minimal change ----------

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-6 md:py-8">
      {/* Nameplate Preview with Navigation Arrows */}
      <div className="relative w-full max-w-[700px] aspect-[1.47] flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-1 md:left-2 bg-white/60 hover:bg-white/80 text-black rounded-full p-1.5 md:p-2 shadow-md z-10 transition-all"
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
          <p 
            className="absolute top-10 md:top-10 right-5 md:right-18 drop-shadow-md whitespace-pre-wrap"
            style={{
              color: houseStyle.color,
              fontSize:` ${houseStyle.fontSize}px`,
              fontWeight: houseStyle.fontWeight,
              fontStyle: houseStyle.fontStyle,
              fontFamily: houseStyle.fontFamily
            }}
          >
            {houseName}
          </p>
          <p 
            className="absolute inset-0 flex justify-center items-center drop-shadow-lg px-4 text-center whitespace-pre-wrap"
            style={{
              color: nameStyle.color,
              fontSize: `${nameStyle.fontSize}px`,
              fontWeight: nameStyle.fontWeight,
              fontStyle: nameStyle.fontStyle,
              fontFamily: nameStyle.fontFamily
            }}
          >
            {name}
          </p>
          <p 
            className="absolute bottom-10 md:bottom-10 inset-x-0 text-center drop-shadow-md px-4 whitespace-pre-wrap"
            style={{
              color: addressStyle.color,
              fontSize: `${addressStyle.fontSize}px`,
              fontWeight: addressStyle.fontWeight,
              fontStyle: addressStyle.fontStyle,
              fontFamily: addressStyle.fontFamily
            }}
          >
            {address}
          </p>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-1 md:right-2 bg-white/60 hover:bg-white/80 text-black rounded-full p-1.5 md:p-2 shadow-md z-10 transition-all"
        >
          <ChevronRight size={20} className="md:w-7 md:h-7" />
        </button>
      </div>

      {/* Designer Controls */}
      <div className="bg-white/90 mt-4 md:mt-6 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg w-full max-w-[700px]">
        {activeTab === "theme" && (
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <h3 className="font-medium text-sm md:text-base">Select Theme</h3>
            <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
              <button
                onClick={() => setTheme("Ambuja")}
                className={`px-4 md:px-5 py-2 rounded-xl border text-sm md:text-base transition-all ${
                  theme === "Ambuja"
                    ? "bg-gray-300 border-gray-400"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                Ambuja
              </button>
              <button
                onClick={() => setTheme("ACC")}
                className={`px-4 md:px-5 py-2 rounded-xl border text-sm md:text-base transition-all ${
                  theme === "ACC"
                    ? "bg-gray-300 border-gray-400"
                    : "bg-white border-gray-300 hover:bg-gray-50"
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
            <textarea
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 rounded-xl p-2 w-full md:w-3/4 text-center text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Enter your name"
              rows="3"
            />
            <TextStyleControls 
              style={nameStyle} 
              setStyle={setNameStyle} 
              fonts={googleFonts}
              loadFont={loadFont}
            />
          </div>
        )}

        {activeTab === "address" && (
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <label className="font-medium text-sm md:text-base">Enter Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-400 rounded-xl p-2 w-full md:w-3/4 text-center text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Enter your address"
              rows="3"
            />
            <TextStyleControls 
              style={addressStyle} 
              setStyle={setAddressStyle} 
              fonts={googleFonts}
              loadFont={loadFont}
            />
          </div>
        )}

        {activeTab === "house" && (
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <label className="font-medium text-sm md:text-base">Enter House Name</label>
            <textarea
              value={houseName}
              onChange={(e) => setHouseName(e.target.value)}
              className="border border-gray-400 rounded-xl p-2 w-full md:w-3/4 text-center text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Enter your house name"
              rows="3"
            />
            <TextStyleControls 
              style={houseStyle} 
              setStyle={setHouseStyle} 
              fonts={googleFonts}
              loadFont={loadFont}
            />
          </div>
        )}

        {/* Submit Button */}
        {activeTab === "house" ? (
          <div className="mt-4 md:mt-6 flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-gray-900 text-white px-6 md:px-8 py-2.5 rounded-xl hover:bg-gray-700 transition-all text-sm md:text-base shadow-md"
            >
              Submit Design
            </button>
          </div>
        ) : null}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-center gap-2 md:gap-4 mt-4 md:mt-6 bg-white/90 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-md flex-wrap">
        <button
          onClick={() => setActiveTab("theme")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm transition-all ${
            activeTab === "theme" ? "bg-gray-300" : "bg-white hover:bg-gray-50"
          }`}
        >
          <Palette size={16} className="md:w-[18px] md:h-[18px]" /> Theme
        </button>
        <button
          onClick={() => setActiveTab("name")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm transition-all ${
            activeTab === "name" ? "bg-gray-300" : "bg-white hover:bg-gray-50"
          }`}
        >
          <User size={16} className="md:w-[18px] md:h-[18px]" /> Name
        </button>
        <button
          onClick={() => setActiveTab("address")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm transition-all ${
            activeTab === "address" ? "bg-gray-300" : "bg-white hover:bg-gray-50"
          }`}
        >
          <MapPin size={16} className="md:w-[18px] md:h-[18px]" /> Address
        </button>
        <button
          onClick={() => setActiveTab("house")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm transition-all ${
            activeTab === "house" ? "bg-gray-300" : "bg-white hover:bg-gray-50"
          }`}
        >
          <Home size={16} className="md:w-[18px] md:h-[18px]" /> House Name
        </button>
      </div>

      {/* You can inspect created object here (dev-only) */}
      {createdNameplate && (
        <pre className="mt-6 max-w-[700px] w-full bg-gray-100 p-4 rounded-md text-sm overflow-auto">
          {JSON.stringify(createdNameplate, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default NameplateDesigner;