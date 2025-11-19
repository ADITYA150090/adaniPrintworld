import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "../../index.css";

const ApproveOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch unverified officers
  const fetchOfficers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/head/unverifiedofficers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      // ✔ Your API returns: success + officers
      if (result.success && result.officers) {
        setOfficers(result.officers);
      }

    } catch (error) {
      console.log("Fetch Error:", error);
      alert("Failed to load officers");
    } finally {
      setLoading(false);
    }
  };

  // Approve Request
  const approveOfficer = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/head/officers/${id}/approve`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
);


      const result = await response.json();

      if (result.success) {
        setOfficers((prev) => prev.filter((officer) => officer._id !== id));
      } else {
        alert(result.error || "Approval failed");
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // Reject Request
 const rejectOfficer = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/head/officers/${id}/reject`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (result.success) {
      setOfficers((prev) => prev.filter((officer) => officer._id !== id));
    } else {
      alert(result.error || "Rejection failed");
    }

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};


  useEffect(() => {
    fetchOfficers();
  }, []);

  if (loading)
    return <p className="p-10 text-lg font-semibold">Loading...</p>;

  return (
    <div className="w-full min-h-screen text-gray-900 p-4 sm:p-6 md:p-10">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Approve Officers
        </h1>
      </div>

      {officers.length === 0 && (
        <p className="text-center text-gray-600 font-medium">
          🎉 No pending officers
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {officers.map((officer) => (
          <div
            key={officer._id}
            className="bg-white rounded-2xl shadow-md p-6 sm:p-7 border border-gray-100 
            hover:shadow-lg hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FaUser className="text-blue-500 text-xl sm:text-2xl" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {officer.name}
                </h2>
              </div>

              <div className="flex items-center gap-2 mb-2 text-gray-700 text-sm">
                <FaEnvelope className="text-gray-500" size={14} />
                <span>{officer.email}</span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-gray-700 text-sm">
                <FaPhoneAlt className="text-gray-500" size={14} />
                <span>{officer.number}</span>
              </div>

              <div className="flex items-start gap-2 mb-4 text-gray-700 text-sm">
                <FaMapMarkerAlt className="text-red-500 mt-1" size={14} />
                <p className="leading-snug">{officer.address}</p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => approveOfficer(officer._id)}
                className="flex items-center justify-center gap-2 bg-green-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-green-600 transition-all text-sm w-[48%]"
              >
                <FaCheck /> Approve
              </button>

              <button
                onClick={() => rejectOfficer(officer._id)}
                className="flex items-center justify-center gap-2 bg-red-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-red-600 transition-all text-sm w-[48%]"
              >
                <FaTimes /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveOfficers;
