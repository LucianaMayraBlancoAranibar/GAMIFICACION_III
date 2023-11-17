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
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="container mx-auto p-4">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sanciones
          </h1>
          <div></div>
          <div></div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Descripcion</div>
                  </th>

                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Valor de la sancion</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {sanctions.map((sanction) => (
                  <tr
                    key={sanction.idSanction}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      {sanction.sanctionDescription}
                    </td>
                    <td className="px-6 py-4">{sanction.sanctionValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSanctionsView;
