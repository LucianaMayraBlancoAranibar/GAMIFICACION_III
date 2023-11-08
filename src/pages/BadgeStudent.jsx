import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const AssignBadgeForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [students, setStudents] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "https://localhost:7205/api";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/Students`)
      .then((response) => {
        const studentOptions = response.data.map((s) => ({
          value: s.idStudent,
          label: `${s.firstName} ${s.lastName}`,
        }));
        setStudents(studentOptions);
      })
      .catch((error) => console.error("Error al cargar estudiantes:", error))
      .finally(() => setLoading(false));
  }, [API_BASE_URL]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/Badges`)
      .then((response) => {
        const initialBadgeOptions = response.data
          .filter((b) => b.badgeLevel.toLowerCase() === "inicial")
          .map((b) => ({
            value: b.idBadge,
            label: b.badgeName,
          }));
        setBadges(initialBadgeOptions);
      })
      .catch((error) => console.error("Error al cargar badges:", error))
      .finally(() => setLoading(false));
  }, [API_BASE_URL]);

  const handleAssignBadge = async () => {
    if (!selectedStudent || !selectedBadge) {
      alert("Por favor, seleccione un estudiante y un badge.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/BadgeStudents/AssignInitialByName`, {
        StudentId: selectedStudent.value,
        BadgeName: selectedBadge.label,
      });
      alert("Badge asignado con éxito al estudiante.");
      setSelectedStudent(null);
      setSelectedBadge(null);
    } catch (error) {
      if (error.response) {
        // La respuesta del servidor fue un error
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        console.error("Error request:", error.request);
      } else {
        // Algo sucedió al configurar la solicitud que disparó un error
        console.error('Error message:', error.message);
      }
      alert("Error al asignar el badge.");
    } finally {
      setLoading(false);
    }
  };
  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Asignar badge a estudiante{" "}
            </h1>
          </div>
          <br></br>
          <label>Estudiante </label>
          <br></br>
          <Select
            value={selectedStudent}
            onChange={setSelectedStudent}
            options={students}
            isLoading={loading}
            placeholder="Seleccione un estudiante..."
            isClearable
            isSearchable
            name="students"
          />
           <br></br>
           <label>Badge </label>
                <br></br>
          <Select
            value={selectedBadge}
            onChange={setSelectedBadge}
            options={badges}
            isLoading={loading}
            placeholder="Seleccione un badge..."
            isClearable
            isSearchable
            name="badges"
          />
           <br></br>
           <br></br>
           <br></br>
           <br></br>
          <button
            className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
            type="submit"
            onClick={handleAssignBadge}
            disabled={loading || !selectedStudent || !selectedBadge}
          >
            {loading ? "Asignando..." : "Asignar Badge"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignBadgeForm;
