// StudentRankView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarStudent from "../partials/SiderbarStudent";
import Header from "../partials/Header";

const StudentRankView = ({ studentId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const studentId = localStorage.getItem("userID");
    if (!studentId) {
      setError("No student ID found");
      setLoading(false);
      navigate("/LoginPage");
      return;
    }
    axios
      .get(`https://localhost:7205/api/Students/${studentId}/RankS`)
      .then((response) => {
        setRank(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching rank: " + err.message);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <div>Loading rank...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!rank) return <div>No rank data available.</div>;

  return (
    <div className="flex h-screen overflow-hidden">
    <SidebarStudent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="p-4 sm:p-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-5">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Rango</h1>
            <div className="flex flex-col items-center">
              <img
                src={rank.imagePath || "default-rank-image.png"}
                alt="Rank"
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
              />
              <h2 className="mt-3 font-bold text-lg">{rank.rankName}</h2>
              <p className="text-sm text-gray-600">Nivel: {rank.rankLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default StudentRankView;
