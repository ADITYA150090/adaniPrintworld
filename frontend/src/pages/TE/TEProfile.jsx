import React, { useEffect, useState } from "react";
import axios from "axios";

const TEProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found. User is not logged in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.data); 
        setLoading(false);
      } catch (error) {
        console.log("Profile Fetch Error:", error.response?.data);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">
        Cannot load profile. Please login again.
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Your Profile {user.tseId && (
            <p className="text-blue-500 font-medium">
              <strong>TSE ID:</strong> {user.tseId}
            </p>
          )}</h2>
        

        <div className="space-y-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.number}</p>

        </div>
      </div>
    </div>
  );
};

export default TEProfile;
