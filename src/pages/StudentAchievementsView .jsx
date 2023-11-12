// StudentAchievementsView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarStudent from "../partials/SiderbarStudent";
import Header from "../partials/Header";

const StudentAchievementsView = ({ studentId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
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
      .get(`https://localhost:7205/api/Students/${studentId}/achievements`)
      .then((response) => {
        setAchievements(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching achievements: " + err.message);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <div>Loading achievements...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!achievements.length) return <div>No achievements found.</div>;

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
          <h1 className="text-2xl font-bold mb-4">Achievements</h1>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Punctuation</th>
                <th className="px-4 py-2 border">Project Name</th>
                <th className="px-4 py-2 border">Type Achievement</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((ach) => (
                <tr key={ach.idAchievement}>
                  <td className="px-4 py-2 border">{ach.nameAchievemt}</td>
                  <td className="px-4 py-2 border">{ach.punctuation}</td>
                  <td className="px-4 py-2 border">{ach.projectName}</td>
                  <td className="px-4 py-2 border">{ach.typeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAchievementsView;
