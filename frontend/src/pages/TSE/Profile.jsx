import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedId = localStorage.getItem("userId"); // Get saved user ID

        if (!storedId) {
          console.log("No user logged in");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/user/${storedId}`
        );

        setUser(res.data.data); // assign user data from backend
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
        No user data found. Please login again.
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Your Profile</h2>

        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.number}
          </p>
          <p>
            <strong>District:</strong> {user.district}
          </p>
          <p>
            <strong>Pincode:</strong> {user.pincode}
          </p>

          {user.tseId && (
            <p className="text-blue-600 font-semibold">
              <strong>TSE ID:</strong> {user.tseId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
