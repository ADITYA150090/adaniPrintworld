import React, { useState } from "react";

const TseSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    tseId: "",
    password: "",
    company: "",
    district: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
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

      if (!formData.tseId.trim()) newErrors.tseId = "TSE ID is required";

      if (!formData.password.trim()) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    }

    if (step === 2) {
      if (!formData.company.trim()) newErrors.company = "Select a company";
      if (!formData.district.trim()) newErrors.district = "District is required";
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
      else if (!/^[0-9]{6}$/.test(formData.pincode))
        newErrors.pincode = "Must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) setStep(2);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    console.log("✅ TSE Signup Data:", formData);

    // 🚀 You can send this data to your backend later:
    // await axios.post("/api/tse/signup", formData);

    // Reset
    setFormData({
      name: "",
      email: "",
      number: "",
      tseId: "",
      password: "",
      company: "",
      district: "",
      pincode: "",
    });
    setStep(1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 dash">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {step === 1 ? "TSE Signup - Step 1" : "TSE Signup - Step 2"}
        </h2>

        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-5">
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
                  } rounded-lg focus:ring-2 focus:ring-blue-500`}
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
                  } rounded-lg focus:ring-2 focus:ring-blue-500`}
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
                  } rounded-lg focus:ring-2 focus:ring-blue-500`}
                />
                {errors.number && (
                  <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                )}
              </div>

              {/* TSE ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TSE ID
                </label>
                <input
                  type="text"
                  name="tseId"
                  value={formData.tseId}
                  onChange={handleChange}
                  placeholder="Enter your TSE ID"
                  className={`w-full px-4 py-2 border ${
                    errors.tseId ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500`}
                />
                {errors.tseId && (
                  <p className="text-red-500 text-sm mt-1">{errors.tseId}</p>
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
                  } rounded-lg focus:ring-2 focus:ring-blue-500`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-700 transition duration-200"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <select
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.company ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Company</option>
                  <option value="Ambuja">Ambuja</option>
                  <option value="ACC">ACC</option>
                </select>
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>

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
                  } rounded-lg focus:ring-2 focus:ring-blue-500`}
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
                  } rounded-lg focus:ring-2 focus:ring-blue-500`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-700 transition duration-200"
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
