import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";

function SucursalEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [sucursal, setSucursal] = useState({
    academicUnityName: "",
  });
  const [AcademicUnityNameError, setAcademicUnityNameError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!sucursal.academicUnityName) {
      setAcademicUnityNameError("El nombre de la sucursal es obligatorio");
      isValid = false;
    } else if (sucursal.academicUnityName.length < 3 || sucursal.academicUnityName.length > 15) {
      setAcademicUnityNameError("El nombre de la sucursal debe tener entre 3 y 15 caracteres");
      isValid = false;
    } else {
      setAcademicUnityNameError("");
    }
    return isValid;
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7205/api/AcademicUnities/${id}`)
      .then((response) => {
        setSucursal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSucursal((prevSucursal) => ({
      ...prevSucursal,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {

      // Crear un objeto con los datos en formato JSON
      const requestData = {
        idAcademicUnity: id,
        academicUnityName: sucursal.academicUnityName,
      };

      axios
        .put(`https://localhost:7205/api/AcademicUnities/${id}`, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Sucursal editada con éxito:", response);
        })
        .catch((error) => {
          console.log(error);
        });
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
              Editar sucursal{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  htmlFor="editSucursalName"
                  className="text-gray-900 dark:text-gray-900"
                >
                  Nuevo Nombre de sucursal
                </label>
                <input
                  type="text"
                  name="academicUnityName"
                  maxLength={30}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={sucursal.academicUnityName}
                  onChange={handleInputChange}
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
                  Guardar Cambios
                </button>
                
              </div>
              <br></br>
              <br></br>
              <Link to="/SucursalTable">Volver a la lista de sucursales</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SucursalEdit;