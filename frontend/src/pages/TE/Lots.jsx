import React, { useEffect, useState } from "react";
import { Layers, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import Sidebar from "../../components/Slidebar";

const Lots = () => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  // Fetch all lots
  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await fetch(
          "https://68fca03096f6ff19b9f5c42c.mockapi.io/lots"
        );
        if (!response.ok) throw new Error("Failed to fetch lots");
        const data = await response.json();
        setLots(data);
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchLots();
  }, []);

  // Create a new lot (numeric only)
  const handleCreateLot = async () => {
    if (isCreating) return;
    setIsCreating(true);

    try {
      // Find the highest lotno and increment
      const maxLotNo =
        lots.length > 0
          ? Math.max(...lots.map((lot) => parseInt(lot.lotno) || 0))
          : 0;

      const newLotNo = maxLotNo + 1;

      const newLot = {
        lotno: newLotNo,
        createdAt: Math.floor(Date.now() / 1000),
      };

      const response = await fetch(
        "https://68fca03096f6ff19b9f5c42c.mockapi.io/lots",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLot),
        }
      );

      if (!response.ok) throw new Error("Failed to create new lot");
      const created = await response.json();

      // Add the new lot at the top of the list
      setLots((prev) => [created, ...prev]);
    } catch (err) {
      alert("Error creating lot: " + (err.message || String(err)));
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading lots...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="w-full max-w-6xl mb-10 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Lots For Technical Executive
          </h1>
          <p className="text-gray-500 font-medium mt-1 text-sm sm:text-base">
            OFF20105922
          </p>
        </div>

        {/* Available Lots Section */}
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm p-5 sm:p-8 relative">
          {/* Title + Create Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Available Lots
            </h2>
            <button
              onClick={handleCreateLot}
              disabled={isCreating}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full shadow-sm transition-all ${
                isCreating
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-700"
              }`}
            >
              <PlusCircle size={18} />
              {isCreating ? "Creating..." : "Create Lot"}
            </button>
          </div>

          {/* Lots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lots.map((lot) => {
              const createdDate = new Date(
                lot.createdAt * 1000
              ).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={lot.id}
                  onClick={() => navigate(`${lot.lotno}`)}
                  className="cursor-pointer bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-200 flex flex-col items-center justify-center p-5 sm:p-6"
                >
                  {/* Icon + Lot Number */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 blur-md bg-blue-400 opacity-60 rounded-full animate-pulse"></div>
                      <div className="relative bg-blue-100 p-4 rounded-full shadow-inner">
                        <Layers className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {lot.lotno}
                    </p>
                  </div>

                  {/* Created On Date */}
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                    Created On:{" "}
                    <span className="font-medium text-gray-700">
                      {createdDate}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lots;
