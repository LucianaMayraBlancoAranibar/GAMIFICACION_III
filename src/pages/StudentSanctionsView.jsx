// StudentSanctionsView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarStudent from "../partials/SiderbarStudent";
import Header from "../partials/Header";

const StudentSanctionsView = ({ studentId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sanctions, setSanctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const studentId = localStorage.getItem("userID");
    if (!studentId) {
      setError("No student ID found");
      setLoading(false);
      navigate("/login");
      return;
    }
    axios
      .get(`https://localhost:7205/api/Students/${studentId}/sanctions`)
      .then((response) => {
        setSanctions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching sanctions: " + err.message);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <div>Loading sanctions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!sanctions.length) return <div>No sanctions found.</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <SidebarStudent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Sanctions</h1>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {sanctions.map((sanction) => (
                <tr key={sanction.idSanction}>
                  <td className="px-4 py-2 border">
                    {sanction.sanctionDescription}
                  </td>
                  <td className="px-4 py-2 border">{sanction.sanctionValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentSanctionsView;
