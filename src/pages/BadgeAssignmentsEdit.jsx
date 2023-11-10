import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useParams } from "react-router-dom";

const AssignBadgeForm = () => {
  const { assignmentId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [students, setStudents] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "https://localhost:7205/api";

  useEffect(() => {
    setLoading(true);
  
    // Carga de estudiantes
    axios.get(`${API_BASE_URL}/Students`)
      .then(response => {
        setStudents(response.data.map(s => ({
          value: s.idStudent,
          label: `${s.firstName} ${s.lastName}`
        })));
      })
      .catch(error => console.error("Error al cargar estudiantes:", error))
      .finally(() => setLoading(false));
  
    // Carga de badges
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
}, [API_BASE_URL, assignmentId]);
  

  const handleSubmit = async () => {
    if (!selectedStudent || !selectedBadge) {
      alert("Por favor, seleccione un estudiante y un badge.");
      return;
    }
    const data = {
      StudentId: selectedStudent.value,
      BadgeId: selectedBadge.value,
    };

    const url = `${API_BASE_URL}/BadgeStudents/${assignmentId}`;

    setLoading(true);
    try {
      await axios.put(url, data);
      alert("Badge actualizado con éxito.");
      setSelectedStudent(null);
      setSelectedBadge(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el badge.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
            {assignmentId
              ? "Actualizar Asignación de Badge"
              : "Asignar Badge a Estudiante"}
          </h1>
          <br />
          <label>Estudiante</label>
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
          <br />
          <label>Badge</label>
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
          <br />
          <button
            className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !selectedStudent || !selectedBadge}
          >
            {loading
              ? "Procesando..."
              : assignmentId
              ? "Actualizar Badge"
              : "Asignar Badge"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignBadgeForm;
