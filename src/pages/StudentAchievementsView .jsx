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
      navigate("/LoginPage");
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarStudent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm mb-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Achievements
          </h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Name </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    {" "}
                    <div className="font-semibold text-left">Punctuation</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    {" "}
                    <div className="font-semibold text-left">Project Name</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    {" "}
                    <div className="font-semibold text-left">
                      Type Achievement
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {achievements.map((ach) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={ach.idAchievement}
                  >
                    <td className="px-6 py-4">{ach.nameAchievemt}</td>
                    <td className="px-6 py-4">{ach.punctuation}</td>
                    <td className="px-6 py-4">{ach.projectName}</td>
                    <td className="px-6 py-4">{ach.typeName}</td>
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

export default StudentAchievementsView;
