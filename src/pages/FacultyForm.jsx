import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion"; // Importa el nuevo componente

function FacultadForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [FacultyName, setNombreFacultad] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      FacultyName: FacultyName,
    };

    try {
      const response = await axios.post(
        "https://localhost:7205/api/Faculties",
        data
      );

      console.log("Facultad registrada con éxito:", response.data);

      setModalIsOpen(true);
      setNombreFacultad("");
    } catch (error) {
      console.error("Error al registrar la facultad:", error);
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm mb-8">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
            Nueva Facultad{" "}
          </h1>

          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="FacultyName"
                >
                  Nombre de Facultad
                </label>
                <input
                  type="text"
                  id="FacultyName"
                  maxLength={30}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={FacultyName}
                  onChange={(e) => setNombreFacultad(e.target.value)}
                />
              </div>
              <br></br>
              <div className="flex justify-left">
                <button
                  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                  type="submit"
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>
          {/* Modal de confirmación */}
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default FacultadForm;
