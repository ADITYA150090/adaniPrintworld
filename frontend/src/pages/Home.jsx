import React from "react";
import { useNavigate } from "react-router-dom";

const AllRoutesPage = () => {
  const navigate = useNavigate();

  const routes = [
    // 🌐 Public Routes
    { path: "/", label: "🏠 Home" },
    { path: "/login", label: "🔑 Login" },
    { path: "/signup", label: "📝 Signup (TE)" },
    { path: "/Tsesignup", label: "🧑‍💼 Signup (TSE)" },

    // 👨‍💻 Technical Executive (TE) Routes
    { path: "/TE", label: "📊 TE Dashboard" },
    { path: "/TE/lots", label: "📦 Lots" },
    { path: "/TE/lots/OFF20105922", label: "📦 Lot Details" },
    { path: "/TE/lots/OFF20105922/createnameplate", label: "🪧 Create Nameplate" },

    // 🧑‍💼 Technical Senior Executive (TSE) Routes
    { path: "/TSE", label: "📈 TSE Dashboard" },
    { path: "/TSE/totalofficers", label: "👥 Total Officers" },
    { path: "/TSE/pendinglots", label: "🕓 Pending Lots" },
    { path: "/TSE/pendinglots/LOT12345", label: "🧾 Verify Nameplates (Lot Details)" },
    { path: "/TSE/verifyofficers", label: "✅ Approve Officers" },

    // 🧑‍💼 Admin Routes
    { path: "/admin", label: "🧠 Admin Dashboard" },
    { path: "/admin/totalRMO", label: "👨‍💼 Total RMOs" },
    { path: "/admin/verifyRMO", label: "✅ Verify RMOs" },
    { path: "/admin/printnameplates", label: "🖨️ Print Nameplates" },

    // 🚫 404 Test Route
    { path: "/random", label: "🚫 Page Not Found (Test)" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center dash px-6 md:px-14 py-12">
      {/* Header */}
      <div className="w-full max-w-5xl mb-10 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          🌐 All Routes Page
        </h1>
        <p className="text-gray-500 font-medium mt-2 text-sm sm:text-base">
          Quick navigation to all pages in the app
        </p>
      </div>

      {/* Routes List */}
      <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {routes.map((route, index) => (
            <button
              key={index}
              onClick={() => navigate(route.path)}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-5 rounded-full shadow-sm transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              {route.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRoutesPage;
