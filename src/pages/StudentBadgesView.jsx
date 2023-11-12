import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarStudent from "../partials/SiderbarStudent";
import Header from "../partials/Header";

const StudentBadgesView = ({ studentId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [badges, setBadges] = useState([]);
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
      .get(`https://localhost:7205/api/Students/${studentId}/badges`)
      .then((response) => {
        setBadges(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching badges: " + err.message);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <div>Loading badges...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!badges.length) return <div>No badges found.</div>;

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
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Badges
          </h1>
          <div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={badge.imagePath || "default-badge-image.png"}
                  alt="Badge"
                  className="w-24 h-24 object-cover"
                />
                <h5 className="mt-2 font-bold">{badge.badgeName}</h5>
                <p className="text-sm text-gray-600">{badge.badgeLevel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBadgesView;
