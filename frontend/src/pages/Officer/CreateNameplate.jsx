import React, { useState } from "react";
import Sidebar from "../../components/Slidebar";
import NameplateDesigner from "../../components/NameplateDesigner";
import "../../index.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="dash">
    <div className="min-h-screen ">
      <Sidebar active={activeTab} onChange={setActiveTab} />
      <div className="flex-1 md:ml-2 lg:ml-60 transition-all duration-500">
        <NameplateDesigner />
      </div>
    </div>
    </div>
  );
}