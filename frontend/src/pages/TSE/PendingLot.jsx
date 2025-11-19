import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaIdBadge, FaClipboardList, FaBoxes } from "react-icons/fa";
import "../../index.css";

const VerifyLots = () => {
  const navigate = useNavigate();
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch unverified lots
  const fetchLots = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/head/lots`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (result.success && result.lots) {
        setLots(result.lots);
      } else {
        setLots([]);
      }

    } catch (err) {
      console.log("Fetch error:", err);
      alert("Failed to load lots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  if (loading)
    return <p className="p-10 text-lg font-semibold">Loading...</p>;

  return (
    <div className="w-full min-h-screen text-gray-900 p-4 sm:p-6 md:p-10">

      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Verify Lots
        </h1>
      </div>

      {lots.length === 0 && (
        <p className="text-center text-gray-600 font-medium">
          🎉 No pending lots to verify
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {lots.map((lot) => (
          <div
            key={lot._id}
            onClick={() => navigate(`${lot._id}`)}
            className="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100 
            hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer"
          >
            {/* Officer / Creator Info */}
            <div className="flex items-center gap-2 mb-3">
              <FaUser className="text-blue-500" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Creator ID: {lot.createdBy}
              </h2>
            </div>

            {/* Lot Number */}
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <FaBoxes className="text-black" />
              <span className="font-medium">Lot: {lot.lotNumber}</span>
            </div>

            {/* TSE ID */}
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <FaIdBadge className="text-black" />
              <span>TSE ID: {lot.tseId}</span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-gray-700">
              <FaClipboardList className="text-black" />
              <span>Status: {lot.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifyLots;
