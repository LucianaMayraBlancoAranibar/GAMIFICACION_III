import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";

function SucursalForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [AcademicUnityName, setNombreSucursal] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [AcademicUnityNameError, setAcademicUnityNameError] = useState("");

  // Función para validar el formulario
  const validateForm = () => {
    let isValid = true;

    if (!AcademicUnityName) {
      setAcademicUnityNameError("El nombre de la sucursal es obligatorio");
      isValid = false;
    } else if (AcademicUnityName.length < 3 || AcademicUnityName.length > 15) {
      setAcademicUnityNameError("El nombre de la sucursal debe tener entre 3 y 15 caracteres");
      isValid = false;
    } else {
      setAcademicUnityNameError("");
    }
    return isValid;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {

      const data = {
        AcademicUnityName: AcademicUnityName,
      };

      try {
        const response = await axios.post(
          "https://localhost:7205/api/AcademicUnities",
          data
        );

        console.log("Sucursal registrada con éxito:", response.data);

        setModalIsOpen(true);
        setNombreSucursal("");
      } catch (error) {
        console.error("Error al registrar la sucursal:", error);
      }
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
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Nueva Sucursal{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="AcademicUnityName"
                >
                  Nombre de la Sucursal
                </label>
                <input
                  type="text"
                  maxLength={30}
                  id="AcademicUnityName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={AcademicUnityName}
                  onChange={(e) => setNombreSucursal(e.target.value)}
                />
                {AcademicUnityNameError && (
                  <p className="text-red-500">{AcademicUnityNameError}</p>)}
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
            <br></br>
            <Link to="/SucursalTable">Volver a la lista de sucursales</Link>
          </form>
          {/* Modal de confirmación */}
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default SucursalForm;

