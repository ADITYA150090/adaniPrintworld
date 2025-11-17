import React, { useState } from "react";
import axios from "axios";

const TseSignup = () => {
  const [step, setStep] = useState(1);
  const [serverMsg, setServerMsg] = useState("");
  const [tseId, setTseId] = useState(""); // NEW → store TSE ID

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    district: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation for each step
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";

      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email format";

      if (!formData.number.trim()) newErrors.number = "Mobile number is required";
      else if (!/^[0-9]{10}$/.test(formData.number))
        newErrors.number = "Must be a 10-digit number";

      if (!formData.password.trim()) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    }

    if (step === 2) {
      if (!formData.district.trim()) newErrors.district = "District is required";

      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
      else if (!/^[0-9]{6}$/.test(formData.pincode))
        newErrors.pincode = "Must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next step
  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) setStep(2);
  };

  // Go back
  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  // Submit final form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      const payload = {
        name: formData.name,
        number: formData.number,
        email: formData.email,
        district: formData.district,
        pincode: formData.pincode,
        password: formData.password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup/head",
        payload
      );

      // Show clean message
      setServerMsg(res.data.message);

      // NEW: Save generated TSE ID
      if (res.data?.data?.tseId) {
        setTseId(res.data.data.tseId);
      }

      console.log("Signup Success:", res.data);

      // Reset form
      setFormData({
        name: "",
        email: "",
        number: "",
        password: "",
        district: "",
        pincode: "",
      });

      setStep(1);
    } catch (error) {
      console.log("Signup Error:", error.response?.data);

      setServerMsg(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 dash">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {step === 1 ? "TSE Signup - Step 1" : "TSE Signup - Step 2"}
        </h2>

        {/* Server Message */}
        {serverMsg && (
          <p
            className={`text-center mb-4 text-sm ${
              serverMsg.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {serverMsg}
          </p>
        )}

        {/* Show TSE ID (after success) */}
        {tseId && (
          <p className="text-center text-blue-600 font-semibold text-md mb-4">
            Your TSE ID: {tseId}
          </p>
        )}

        <form
          onSubmit={step === 1 ? handleNext : handleSubmit}
          className="space-y-5"
        >
          {/* STEP 1 */}
          {step === 1 && (
            <>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-2 border ${
                    errors.number ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.number && (
                  <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full px-4 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition"
              >
                Next
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District Area
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Enter your district"
                  className={`w-full px-4 py-2 border ${
                    errors.district ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit pincode"
                  className={`w-full px-4 py-2 border ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default TseSignup;
