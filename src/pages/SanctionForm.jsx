import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Select from "react-select";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";

function SanctionForm() {
  const [idStudent, setIdStudent] = useState("");
  const [sanctionDescription, setSanctionDescription] = useState("");
  const [sanctionValue, setSanctionValue] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [students, setStudents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const API_BASE_URL = "https://localhost:7205/api/Sanctions";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://localhost:7205/api/Sanctions/GetAllStudents"
        );
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error al cargar los estudiantes:", error);
      }
    };

    fetchStudents();
  });

  const studentOptions = students.map((s) => ({
    value: s.idStudent,
    label: s.fullName,
  }));

  const handleCreateSanction = async () => {
    if (!idStudent || !sanctionDescription || !sanctionValue) {
      console.log("Campos:", idStudent, sanctionDescription, sanctionValue);
      setErrors({ form: "Todos los campos son requeridos" });
      return;
    }

    setLoading(true);
  setErrors({}); // Reset any previous errors

    const userIDFromLocalStorage = parseInt(localStorage.getItem("userID"));

    if (isNaN(userIDFromLocalStorage) || userIDFromLocalStorage <= 0) {
      console.error("El ID del gestor o administrador no es válido.");
      setErrors({ form: "Por favor, inicie sesión de nuevo." });
      return;
    }

    const payload = {
      IdStudent: idStudent,
      SanctionDescription: sanctionDescription,
      SanctionValue: parseInt(sanctionValue),
      ResponsibleGestorId: currentUser?.id || userIDFromLocalStorage,
    };

    console.log("Datos enviados al servidor:", payload);

    try {
      const response = await fetch(API_BASE_URL + "/CreateSanction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.status === 200) {
        setModalIsOpen(true);
        alert("Sanción creada exitosamente!");
      } else {
        setErrors({ form: data.message || "Error al crear la sanción." });
      }
    } catch (error) {
      setErrors({ form: "Sancion creada." });
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
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear Sanción{" "}
            </h1>
          </div>
          <br></br>
          <div>
            {errors.form && <div className="error">{errors.form}</div>}
            <label>
              Estudiante:
              <Select
                options={studentOptions}
                onChange={(selectedOption) =>
                  setIdStudent(selectedOption.value)
                }
                placeholder="Escribe y selecciona un estudiante..."
              />
            </label>

            <label>
              Descripción de la Sanción:
              <textarea
                className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={sanctionDescription}
                onChange={(e) => setSanctionDescription(e.target.value)}
              ></textarea>
            </label>

            <label>
              Valor de la Sanción:
              <input
                className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="number"
                value={sanctionValue}
                onChange={(e) => setSanctionValue(e.target.value)}
              />
            </label>
            <br></br>
            <br></br>
            <button
              className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
              type="submit"
              onClick={handleCreateSanction}
              disabled={loading}
            >
              Crear Sanción
            </button>
          </div>
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default SanctionForm;
