import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const LotsID = () => {
  const { lotno } = useParams(); // e.g. OFF20105922
  const navigate = useNavigate();

  const handleCreateSlot = () => {
    navigate(`createnameplate`);
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800 px-4 md:px-14 py-10">
      {/* Header */}
      <div className="w-full max-w-6xl mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-3xl font-bold text-gray-900">
          Lot Details : {lotno}
        </h1>
     
      </div>

      {/* Card */}
      <div className="w-full max-w-6xl bg-white border border-gray-200 rounded-2xl shadow-sm py-16 px-8 flex justify-center relative">
        {/* Top-right Create Slot Button */}
        <button
          onClick={handleCreateSlot}
          className="absolute top-5 right-6 bg-black text-white font-medium px-5 py-2.5 rounded-full hover:bg-gray-700 transition-all shadow-sm"
        >
          Create slot +
        </button>

        {/* Center Message */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            No Lots Available
          </h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Create your first lot to get started
          </p>

          <button
            onClick={handleCreateSlot}
            className="bg-black text-white font-semibold px-6 py-2.5 rounded-full hover:bg-gray-700 transition-all shadow-sm"
          >
            Create first slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default LotsID;
