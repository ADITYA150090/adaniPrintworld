import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "../../index.css";

const LotDetails = () => {
  const { lotno } = useParams();
  const navigate = useNavigate();

  // 🔹 Mock data for nameplates
  const [nameplates, setNameplates] = useState([
    {
      id: 1,
      ownerName: "Ramesh Patil",
      houseName: "Om Villa",
      address: "Plot 21, Bajaj Nagar, Nagpur",
      status: "Pending",
    },
    {
      id: 2,
      ownerName: "Priya Joshi",
      houseName: "Sai Sadan",
      address: "Trimurti Chowk, Nagpur",
      status: "Pending",
    },
    {
      id: 3,
      ownerName: "Vikas Singh",
      houseName: "Shiv Gauri",
      address: "Manish Nagar, Nagpur",
      status: "Pending",
    },
  ]);

  const [selected, setSelected] = useState([]);

  // ✅ Toggle single checkbox
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // ✅ Toggle select all
  const toggleSelectAll = () => {
    if (selected.length === nameplates.filter(p => p.status === "Pending").length) {
      setSelected([]);
    } else {
      setSelected(nameplates.filter(p => p.status === "Pending").map((p) => p.id));
    }
  };

  // ✅ Approve or reject a single plate
  const handleAction = (plateId, action) => {
    setNameplates((prev) =>
      prev.map((p) =>
        p.id === plateId
          ? { ...p, status: action === "approve" ? "Approved" : "Rejected" }
          : p
      )
    );
    setSelected((prev) => prev.filter((id) => id !== plateId));
  };

  // ✅ Bulk Approve / Reject
  const handleBulkAction = (action) => {
    setNameplates((prev) =>
      prev.map((p) =>
        selected.includes(p.id)
          ? { ...p, status: action === "approve" ? "Approved" : "Rejected" }
          : p
      )
    );
    setSelected([]);
  };

  const allPendingSelected =
    selected.length === nameplates.filter(p => p.status === "Pending").length &&
    selected.length > 0;

  return (
    <div className="w-full min-h-screen  text-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      
        <h1 className="text-2xl sm:text-3xl font-bold text-center w-full sm:w-auto">
          Lot Details (Lot ID: {lotno})
        </h1>
      </div>

      {/* Bulk Action Bar */}
      {selected.length > 0 && (
        <div className="mb-4 flex justify-between flex-wrap items-center bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3">
          <p className="text-gray-700 text-sm sm:text-base">
            {selected.length} selected
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleBulkAction("approve")}
              className="flex items-center gap-2 bg-green-500 text-white font-medium px-3 py-2 rounded-lg hover:bg-green-600 transition-all text-sm"
            >
              <FaCheck /> Approve Selected
            </button>
            <button
              onClick={() => handleBulkAction("reject")}
              className="flex items-center gap-2 bg-red-500 text-white font-medium px-3 py-2 rounded-lg hover:bg-red-600 transition-all text-sm"
            >
              <FaTimes /> Reject Selected
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">
                  <input
                    type="checkbox"
                    checked={allPendingSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4 text-left">Owner Name</th>
                <th className="py-3 px-4 text-left">House Name</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {nameplates.map((plate) => (
                <tr
                  key={plate.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                >
                  <td className="py-3 px-4">
                    {plate.status === "Pending" && (
                      <input
                        type="checkbox"
                        checked={selected.includes(plate.id)}
                        onChange={() => toggleSelect(plate.id)}
                        className="w-4 h-4 accent-blue-500 cursor-pointer"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {plate.ownerName}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{plate.houseName}</td>
                  <td className="py-3 px-4 text-gray-600">{plate.address}</td>
                  <td className="py-3 px-4 text-center">
                    {plate.status === "Pending" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleAction(plate.id, "approve")}
                          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all"
                        >
                          <FaCheck /> Approve
                        </button>
                        <button
                          onClick={() => handleAction(plate.id, "reject")}
                          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all"
                        >
                          <FaTimes /> Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold ${
                          plate.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {plate.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        Showing {nameplates.length} nameplates
      </div>
    </div>
  );
};

export default LotDetails;
