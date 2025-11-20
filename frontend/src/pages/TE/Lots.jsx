import React, { useEffect, useState } from "react";
import { Layers, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getLots, createLot } from "../../api";
import "../../index.css";
import Sidebar from "../../components/Slidebar";

const Lots = () => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const [tempLotCounter, setTempLotCounter] = useState(1);

  // Normalize lot data from API
  const normalizeLot = (lot) => ({
    id: lot.id,
    lotno: lot.lotno,
    
    createdAt:
      lot.createdAt ||
      lot.created_at ||
      Math.floor(Date.now() / 1000),
  });

  // Fetch all lots
  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await getLots();

        let lotsData = [];

        if (Array.isArray(response.data?.data)) {
          lotsData = response.data.data;
        } else if (Array.isArray(response.data?.lots)) {
          lotsData = response.data.lots;
        } else if (Array.isArray(response.data)) {
          lotsData = response.data;
        } else if (Array.isArray(response)) {
          lotsData = response;
        }

        const normalized = lotsData.map(normalizeLot);

        setLots(normalized);
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, []);

  // Create a new lot
const handleCreateLot = async () => {
  if (isCreating) return;
  setIsCreating(true);

  try {
    await createLot({}); // don't use response here

    // REFRESH THE LOT LIST again to get REAL names from API
    const response = await getLots();
    console.log("Lots after creation:", response);

    let lotsData = [];

    if (Array.isArray(response.data?.data)) {
      lotsData = response.data.data;
    } else if (Array.isArray(response.data?.lots)) {
      lotsData = response.data.lots;
    } else if (Array.isArray(response.data)) {
      lotsData = response.data;
    } else if (Array.isArray(response)) {
      lotsData = response;
    }

    setLots(lotsData.map(normalizeLot));
  } catch (err) {
    alert("Error creating lot: " + (err.message || String(err)));
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
      <div className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="w-full max-w-6xl mb-10 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Lots For Technical Executive
          </h1>
          
        </div>

        {/* Available Lots Section */}
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm p-5 sm:p-8 relative">
          {/* Title + Create Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Available Lots ({lots.length})
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

          {/* No Lots UI */}
          {lots.length === 0 && (
            <div className="text-center py-12">
              <Layers className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No lots available yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Click "Create Lot" to add your first lot
              </p>
            </div>
          )}

          {/* Lots Grid */}
          {lots.length > 0 && (
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
                    key={lot.lotno}
                    onClick={() =>
                      navigate(`${lot.lotno}`)
                    }
                    className="cursor-pointer bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-200 flex flex-col items-center justify-center p-5 sm:p-6"
                  >
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Lots;
