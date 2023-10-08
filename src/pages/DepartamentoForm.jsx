import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";

function DepartamentoForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [Facultad, setFacultad] = useState("");
  const [idFaculty, setidFaculty] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:7220/api/Faculties")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setFacultad(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });

  }, []);


  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      departmentName: departmentName,
      idFaculty: idFaculty,
    };

    try {
      const response = await axios.post(
        "https://localhost:7220/api/Departments",
        data
      );

      console.log("Sucursal registrada con éxito:", response.data);

      setModalIsOpen(true);
      setDepartmentName("");
      setidFaculty("");
    } catch (error) {
      console.error("Error al registrar la sucursal:", error);
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
              Nuevo Departamento{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="departmentName"
                >
                  Nombre del departamento
                </label>
                <input
                  type="text"
                  id="departmentName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="departmentName"
                >
                  Carrera
                </label>

                {Facultad.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idFaculty"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idFaculty}
                    onChange={(e) => setidFaculty(e.target.value)}
                  >
                    <option value="">Selecciona una Carrera</option>
                    {Facultad.map((facultad) => (
                      <option
                        key={facultad.idFaculty}
                        value={facultad.idFaculty}
                      >
                        {facultad.facultyName}
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
            <Link to="/DepartamentoTable">Volver a la lista de departamentos</Link>
          </form>
          {/* Modal de confirmación */}
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default DepartamentoForm;
