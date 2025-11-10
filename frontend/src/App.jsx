import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import TseSignup from "./pages/Auth/SignupTSE";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

import MainLayout from "./layouts/OfficerLayout";
import TEDashboard from "./pages/TE/TE_Dashboard.jsx";
import CreateNameplate from "./pages/TE/CreateNameplate";
import Lots from "./pages/TE/Lots.jsx";
import LotsID from "./pages/TE/LotsId.jsx";
import RmoLayout from "./layouts/RmoLayout.jsx";
import TSEDashboard from "./pages/TSE/TSE_Dashboard.jsx";
import TotalOfficers from "./pages/TSE/TotalOfficers.jsx";
import PendingLots from "./pages/TSE/PendingLot.jsx";
import VerifyNameplate from "./pages/TSE/VerifyNameplates.jsx";
import ApproveOfficers from "./pages/TSE/VerifyTE.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Tsesignup" element={<TseSignup />} />

        {/* 🧭 Officer Routes inside layout */}
        <Route path="/TE" element={<MainLayout />}>
          <Route index element={<TEDashboard />} />
          <Route path="lots" element={<Lots />} />
          <Route path="lots/:lotno" element={<LotsID />} />
          <Route path="lots/:lotno/createnameplate" element={<CreateNameplate />} />
          
        </Route>
         <Route path="/TSE" element={<RmoLayout/>}>
          <Route index element={<TSEDashboard />} />
          <Route path="totalofficers" element={<TotalOfficers />} />
          <Route path="pendinglots" element={<PendingLots />} />
          <Route path="pendinglots/:lotno" element={<VerifyNameplate />} />
          <Route path="verifyofficers" element={<ApproveOfficers />} />
        </Route>

        {/* 🚫 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
