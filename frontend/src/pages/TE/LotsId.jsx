import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNameplates } from "../../api";

const LotsID = () => {
  const { lotno } = useParams(); // e.g. OFF20105922
  const navigate = useNavigate();
  const [nameplates, setNameplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNameplates = async () => {
      try {
        const response = await getNameplates(lotno);
        setNameplates(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch nameplates");
      } finally {
        setLoading(false);
      }
    };

    fetchNameplates();
  }, [lotno]);

  const handleCreateDesign = () => {
    navigate(`createnameplate`);
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading nameplates...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col text-gray-800 px-4 md:px-14 py-10">
      {/* Header */}
      <div className="w-full max-w-6xl mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-3xl font-bold text-gray-900">
          Lot Details : {lotno}
        </h1>

      </div>

      {/* Nameplates Grid */}
      {nameplates.length > 0 ? (
        <div className="w-full max-w-6xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8 relative">
          {/* Top-right Create Design Button */}
          <button
            onClick={handleCreateDesign}
            className="absolute top-5 right-6 bg-black text-white font-medium px-5 py-2.5 rounded-full hover:bg-gray-700 transition-all shadow-sm"
          >
            Create Design +
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nameplates.map((nameplate) => (
              <div
                key={nameplate._id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-800">{nameplate.name}</h3>
                <p className="text-sm text-gray-600">{nameplate.address}</p>
                <p className="text-sm text-gray-600">{nameplate.houseName}</p>
                <p className="text-xs text-gray-500 mt-2">Status: {nameplate.status || 'Pending'}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Card */
        <div className="w-full max-w-6xl bg-white border border-gray-200 rounded-2xl shadow-sm py-16 px-8 flex justify-center relative">
          {/* Top-right Create Design Button */}
          <button
            onClick={handleCreateDesign}
            className="absolute top-5 right-6 bg-black text-white font-medium px-5 py-2.5 rounded-full hover:bg-gray-700 transition-all shadow-sm"
          >
            Create Design +
          </button>

          {/* Center Message */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              No Nameplates Available
            </h2>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              Create your first nameplate to get started
            </p>

            <button
              onClick={handleCreateDesign}
              className="bg-black text-white font-semibold px-6 py-2.5 rounded-full hover:bg-gray-700 transition-all shadow-sm"
            >
              Create first nameplate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotsID;
