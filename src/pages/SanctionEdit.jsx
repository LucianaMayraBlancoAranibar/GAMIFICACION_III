import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import ModalConfirmacion from "../partials/ModalConfirmacion";

function SanctionEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [idStudent, setidStudent] = useState("");
  const [sancion, setSancion] = useState({
    description: "",
    sanction1: "",
    idStudent: "",
    idProfessor: "",
    idAdministrator: "",
  });
  const [Estudiante, setEstudiante] = useState("");

  useEffect(() => {
    axios
      .get(`https://localhost:7220/api/sanctions/${id}`)
      .then((response) => {
        setSancion(response.data);
        setidStudent(response.data.idStudent);

      })
      .catch((error) => {
        console.log(error);
      });
    
      axios
      .get("https://localhost:7220/api/Students")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setEstudiante(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });    
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "idStudent") {
      setidStudent(value); // Actualiza idStudent directamente
    }
    setSancion((prevSancion) => ({
      ...prevSancion,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Crear un objeto con los datos en formato JSON
    const requestData = {
      idSanctions: id,
      description: sancion.description,
      sanction1: sancion.sanction1,
      idProfessor: sancion.idProfessor,
      idAdministrator: sancion.idAdministrator,
      idStudent: idStudent,
    };

    axios
      .put(`https://localhost:7220/api/sanctions/${id}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
              Editar sancion{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  htmlFor="description"
                  className="text-gray-900 dark:text-gray-900"
                >
                  Descripción
                </label>
                <input
                  type="text"
                  name="description"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={sancion.description}
                  onChange={handleInputChange}
                />
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="sanction1"
                >
                  Puntaje:
                </label>
                <input
                  type="number"
                  name="sanction1"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={sancion.sanction1}
                  onChange={handleInputChange}
                />
                <br/>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idStudent"
                >
                  Estudiante:
                </label>
                <br/>
                {Estudiante.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idStudent"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idStudent}
                    onChange={(e) => setIdStudent(e.target.value)}
                  >
                    {Estudiante.map((estudiante) => (
                      <option
                        key={estudiante.idStudent}
                        value={estudiante.idStudent}
                      >
                        {estudiante.firstName + " " + estudiante.lastName}
                      </option>
                    ))}
                  </select>
                )}
                <br/>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idStudent"
                >
                  maestro:
                </label>
                <input
                  type="number"
                  name="idProfessor"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={sancion.idProfessor}
                  onChange={(e) => setIdProfessor(e.target.value)}
                />
                <br/>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idAdministrator"
                >
                  administrador:
                </label>
                <input
                  type="number"
                  name="idAdministrator"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={sancion.idAdministrator}
                  onChange={(e) => setidAdministrator(e.target.value)}
                />
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
              <Link to="/SanctionTable">Volver a la lista de sanciones</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SanctionEdit;
