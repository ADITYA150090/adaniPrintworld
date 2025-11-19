import React, { useState } from "react";
import { signupOfficer } from "../../api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    password: "",
    tseId: "",       // ✅ Added TSE ID
  });

  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate user input
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.number.trim()) newErrors.number = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(formData.number))
      newErrors.number = "Mobile number must be 10 digits";

    if (!formData.tseId.trim()) newErrors.tseId = "TSE ID is required"; // ✅ Validation added

    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await signupOfficer(formData);

      console.log("Server Response:", response.data);
      setServerMsg(response.data.message || "Signup successful! Please verify your email.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        number: "",
        address: "",
        password: "",
        tseId: "",
      });
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      setServerMsg(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="dash min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="number"
              placeholder="Enter your 10-digit number"
              value={formData.number}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.number ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
          </div>

          {/* TSE ID — NEW FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              TSE ID
            </label>
            <input
              type="text"
              name="tseId"
              placeholder="Enter your TSE ID"
              value={formData.tseId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.tseId ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.tseId && <p className="text-red-500 text-sm mt-1">{errors.tseId}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              rows="2"
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
