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
import TotalOfficers from "./pages/TSE/totalOfficers.jsx";
import PendingLots from "./pages/TSE/PendingLot.jsx";
import VerifyNameplate from "./pages/TSE/VerifyNameplates.jsx";
import ApproveOfficers from "./pages/TSE/VerifyTE.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import TotalRMO from "./pages/Admin/TotalRMO.jsx";
import VerifyRMO from "./pages/Admin/VerifyRmo.jsx";
import PrintNameplates from "./pages/Admin/PrintNameplates.jsx";
import Profile from "./pages/TSE/Profile.jsx";
import TEProfile from "./pages/TE/TEProfile.jsx";

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
          <Route path="profile" element={<TEProfile/>} />
          
        </Route>
         <Route path="/TSE" element={<RmoLayout/>}>
          <Route index element={<TSEDashboard />} />
          <Route path="totalofficers" element={<TotalOfficers/>} />
          <Route path="pendinglots" element={<PendingLots />} />
          <Route path="pendinglots/:lotno" element={<VerifyNameplate />} />
          <Route path="verifyofficers" element={<ApproveOfficers />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminDashboard />} />
          <Route path="totalRMO" element={<TotalRMO/>} />
          <Route path="verifyRMO" element={<VerifyRMO />} />
          <Route path="printnameplates" element={<PrintNameplates />} />
          
        </Route>



        {/* 🚫 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
