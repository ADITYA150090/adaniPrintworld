import React from "react";

const PrintNameplates = () => {
  // 🔹 Hardcoded list (replace later with backend data)
  const nameplateLots = [
    {
      id: 1,
      officerId: "OFF123",
      rmoId: "RMO001",
      totalNameplates: 25,
      lotId: "LOT_001",
    },
    {
      id: 2,
      officerId: "OFF124",
      rmoId: "RMO002",
      totalNameplates: 18,
      lotId: "LOT_002",
    },
    {
      id: 3,
      officerId: "OFF125",
      rmoId: "RMO003",
      totalNameplates: 30,
      lotId: "LOT_003",
    },
    {
      id: 4,
      officerId: "OFF126",
      rmoId: "RMO004",
      totalNameplates: 10,
      lotId: "LOT_004",
    },
  ];

  
  const handleDownload = (lotId) => {
    alert(`🖨️ Downloading nameplates for ${lotId}`);
  };

  return (
    <div className="w-full min-h-screen  text-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Print Nameplates
        </h1>
     
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Officer ID</th>
              <th className="p-4">RMO ID</th>
              <th className="p-4">Total Nameplates</th>
              <th className="p-4">Lot ID</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {nameplateLots.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4 font-medium">{item.officerId}</td>
                <td className="p-4">{item.rmoId}</td>
                <td className="p-4">{item.totalNameplates}</td>
                <td className="p-4">{item.lotId}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDownload(item.lotId)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium text-sm transition active:scale-95"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {nameplateLots.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">
            No lots available to print.
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintNameplates;
