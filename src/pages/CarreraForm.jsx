import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";

function CarreraForm() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [careersName, setcareersName] = useState("");
    const [idDepartment, setidDepartment] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [careersNameError, setcareersNameError] = useState("");
    const [idDepartmentError, setidDepartmentError] = useState("");

    useEffect(() => {
        axios
          .get("https://localhost:7220/api/Usuarios")
          .then((response) => {
            console.log(response.data); // Verifica los datos que obtienes
            setUsuario(response.data);
          })
          .catch((error) => {
            console.error(error); // Verifica si hay errores en la llamada a la API
          });
    
      }, []);
    
        // Función para validar el formulario
        const validateForm = () => {
          let isValid = true;
      
          if (!careersName) {
            setcareersNameError("El nombre del estudiante es obligatorio");
            isValid = false;
          } else if (careersName.length < 3 || careersName.length > 15) {
            setcareersNameError("El nombre del estudiante debe tener entre 3 y 15 caracteres");
            isValid = false;
          } else {
            setcareersNameError("");
          }

          
          
          if (!idDepartment) {
            setidDepartmentError("Debes seleccionar una carrera");
            isValid = false;
          } else {
            setidDepartmentError("");
          }
      
          return isValid;
        };
    
      async function handleSubmit(event) {
        event.preventDefault();
    
        if (validateForm()) {
          const data = {
            careersName: careersName,
            studentLastName: studentLastName,
            idDepartment: idDepartment,
          };
    
          try {
            const response = await axios.post(
              "https://localhost:7220/api/Careers",
              data
            );
    
            console.log("Sucursal registrada con éxito:", response.data);
    
            setModalIsOpen(true);
            setcareersName("");
            setstudentLastName("");
            setidDepartment("");
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
                  Nuevo Carrera{" "}
                </h1>
              </div>
              <br></br>
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <label
                      className="text-gray-900 dark:text-gray-900"
                      htmlFor="careersName"
                    >
                      Nombre de carrera
                    </label>
                    <input
                      type="text"
                      id="careersName"
                      className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={careersName}
                      onChange={(e) => setcareersName(e.target.value)}
                    />
                    {careersNameError && (
                      <p className="text-red-500">{careersNameError}</p>)}
                    <br />

                    
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
                <Link to="/CarreraTable">Volver a la lista de carrera</Link>
              </form>
              {/* Modal de confirmación */}
              <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
            </div>
          </div>
        </div>
      );
    }
    
    export default CarreraForm;