// StudentProfileView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userStudent from "../images/user_logo.png";
import SidebarStudent from "../partials/SiderbarStudent";
import Header from "../partials/Header";

const StudentProfileView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = localStorage.getItem("userID");
    if (!studentId) {
      setError("No student ID found");
      setLoading(false);
      navigate("/login");
      return;
    }

    axios
      .get(`https://localhost:7205/api/Students/${studentId}/GetStudentProfile`)
      .then((response) => {
        setStudentProfile(response.data);
      })
      .catch((err) => {
        setError("Error fetching student profile: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!studentProfile) return <div className="text-center p-4">No student profile data available.</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <SidebarStudent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="container mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-xl mt-6">
          <div className="text-center mb-8">
            <img src={userStudent} alt="Profile" className="w-32 h-32 rounded-full mx-auto border-2 border-gray-300" />
            <h1 className="text-3xl font-bold mt-4">
              {studentProfile.firstName} {studentProfile.lastName}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Nombres" value={studentProfile.firstName} />
            <InfoField label="Apellidos" value={studentProfile.lastName} />
            <InfoField label="Email" value={studentProfile.email} />
            <InfoField label="Carrera" value={studentProfile.career} />
            <InfoField label="Facultad" value={studentProfile.faculty} />
            <InfoField label="Departamento" value={studentProfile.department} />
            {/* <InfoField label="Sucursal" value={studentProfile.academicUnit} /> */}
          </div>
        </main>
      </div>
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <label className="text-gray-700 font-bold">{label}</label>
    <p className="mt-1 text-gray-600">{value}</p>
  </div>
);

export default StudentProfileView;
