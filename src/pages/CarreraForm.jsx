import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";

function CarreraForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [careerName, setCareerName] = useState("");
  const [idDepartment, setIdDepartment] = useState("");

  const [Department, setDepartment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [departmentNameError, setDepartmentNameError] = useState("");
  const [idDepartmentError, setIdDepartmentError] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7205/api/Departments")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setDepartment(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });

  }, []);

    // Función para validar el formulario
    const validateForm = () => {
      let isValid = true;
  
      if (!careerName) {
        setDepartmentNameError("El nombre la carrera es obligatorio");
        isValid = false;
      } else if (careerName.length < 3) {
        setDepartmentNameError("El nombre de la carrera debe tener mas de 3 caracteres");
        isValid = false;
      } else {
        setDepartmentNameError("");
      }
      
      if (!idDepartment) {
        setIdDepartmentError("Debes seleccionar un departamento");
        isValid = false;
      } else {
        setIdDepartmentError("");
      }
  
      return isValid;
    };

  async function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      const data = {
        careerName: careerName,
        idDepartment: idDepartment,
      };

      try {
        const response = await axios.post(
          "https://localhost:7205/api/Careers",
          data
        );

        console.log("Carrera registrada con éxito:", response.data);

        setModalIsOpen(true);
        setCareerName("");
        setIdDepartment("");
      } catch (error) {
        console.error("Error al registrar la carrera:", error);
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
              Nueva Carrera{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="careerName"
                >
                  Nombre de la carrera
                </label>
                <input
                  type="text"
                  id="careerName"
                  maxLength={35}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={careerName}
                  onChange={(e) => setCareerName(e.target.value)}
                />
                {departmentNameError && (
                  <p className="text-red-500">{departmentNameError}</p>)}
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="careerName"
                >
                  Departamento
                </label>

                {Department.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idDepartment"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idDepartment}
                    onChange={(e) => setIdDepartment(e.target.value)}
                  >
                    <option value="">Selecciona un departamento</option>
                    {Department.map((department) => (
                      <option
                        key={department.idDepartment}
                        value={department.idDepartment}
                      >
                        {department.departmentName}
                      </option>
                    ))}
                  </select>
                )}

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
            <Link to="/CareerTable">Volver a la lista de carreras</Link>
          </form>
          {/* Modal de confirmación */}
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default CarreraForm;