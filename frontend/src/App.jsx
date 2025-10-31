import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import TEDashboard from "./pages/Officer/TE_Dashboard.jsx";
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import CreateNameplate from "./pages/Officer/CreateNameplate.jsx";
import Lots from "./pages/Officer/Lots.jsx";
import TseSignup from "./pages/Auth/SignupTSE.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Tsesignup" element={<TseSignup />} />
        <Route path="/tedashboard" element={<TEDashboard />} />
        <Route path="/createnameplate" element={<CreateNameplate />} />
         <Route path="/lots" element={<Lots />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
};

export default App;
