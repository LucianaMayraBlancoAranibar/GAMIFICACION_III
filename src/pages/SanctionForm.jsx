import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";

function SanctionForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [sanction1, setSanction1] = useState("");
  const [idStudent, setIdStudent] = useState("");
  const [idProfessor, setIdProfessor] = useState("");
  const [idAdministrator, setidAdministrator] = useState("");
  const [Estudiante, setEstudiante] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:7220/api/Students")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setEstudiante(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });

  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      description: description,
      sanction1: sanction1,
      idStudent: idStudent,
      idProfessor: idProfessor,
      idAdministrator: idAdministrator,
    };

    try {
      const response = await axios.post(
        "https://localhost:7220/api/Sanctions",
        data
      );

      console.log("Sancion registrada con éxito:", response.data);

      setModalIsOpen(true);
      description("");
      sanction1("");
      idStudent("");
      idProfessor("");
      idAdministrator("");
    } catch (error) {
      console.error("Error al registrar la Sancion:", error);
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
              Nueva Sanción{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="description"
                >
                  Descripción:
                </label>
                <input
                  type="text"
                  id="description"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br/>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="sanction1"
                >
                  Puntaje:
                </label>
                <input
                  type="number"
                  id="sanction1"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={sanction1}
                  onChange={(e) => setSanction1(e.target.value)}
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
                    onChange={(e) => {
                      console.log("Valor seleccionado en el select:", e.target.value); // Agrega este console.log
                      setIdStudent(e.target.value);
                    }} 
                    >
                    <option value="">Selecciona un estudiante</option>
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
                  id="idProfessor"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={idProfessor}
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
                  id="idAdministrator"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={idAdministrator}
                  onChange={(e) => setidAdministrator(e.target.value)}
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
            <br></br>
            <Link to="/SanctionTable">Volver a la lista de sanciones</Link>
          </form>
          {/* Modal de confirmación */}
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default SanctionForm;
