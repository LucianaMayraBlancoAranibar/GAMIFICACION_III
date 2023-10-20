import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";


function BadgeForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [Estudiante, setEstudiante] = useState("");
  const [BadgeImage, setBadgeImage] = useState("");
  const [idStudent, setIdStudent] = useState("");
  const [badgeName, setBadgeName] = useState("");
  const [idAdministrator, setIdAdministrator] = useState("1");
  const [badgeLevel, setBadgeLevel] = useState("");
  const [idBadgeImage, setidBadgeImage] = useState("");
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

    axios
      .get("https://localhost:7220/api/BadgeImages")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setBadgeImage(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

      const data = {
        badgeName: badgeName,
        idStudent: idStudent,
        idAdministrator: idAdministrator,
        badgeLevel: badgeLevel,
        idBadgeImage: idBadgeImage,
      };

      try {
        const response = await axios.post(
          "https://localhost:7220/api/Badges",
          data
        );

        console.log("Badge registrado con éxito:", response.data);

        setModalIsOpen(true);
        setBadgeName("");
        setIdStudent("");
        setIdAdministrator(""),
        setBadgeLevel("");
        setidBadgeImage("");
      } catch (error) {
        console.error("Error al registrar el Badge:", error);
      }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Nuevo Badge{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="badgeName"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="badgeName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={badgeName}
                  onChange={(e) => setBadgeName(e.target.value)}
                />
              </div>
              <br></br>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="badgeLevel"
                >
                  Nivel de Badge
                </label>
                <input
                  type="text"
                  id="badgeLevel"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={badgeLevel}
                  onChange={(e) => setBadgeLevel(e.target.value)}
                />
              </div>
              <br></br>
              <div>
              <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idBadgeImage"
                >
                  Badge:
                </label>

                <br/>
                {BadgeImage.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idBadgeImage"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idBadgeImage}
                    onChange={(e) => {
                      console.log("Valor seleccionado en el select:", e.target.value); // Agrega este console.log
                      setidBadgeImage(e.target.value);
                    }} 
                    >
                    <option value="">Selecciona una imagen</option>
                    {BadgeImage.map((badge) => (
                      <option
                        key={badge.idBadgeImage}
                        value={badge.idBadgeImage}
                      >
                        {badge.nameImage}
                      </option>
                    ))}
                  </select>
                )}

              </div>

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
                    <option value="">Selecciona un badge</option>
                    {Estudiante.map((badge) => (
                      <option
                        key={badge.idStudent}
                        value={badge.idStudent}
                      >
                        {badge.firstName + " " + badge.lastName}
                      </option>
                    ))}
                  </select>
                  
                )}
              <br/>
              <div className="flex justify-left">
                <button
                  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                  type="submit"
                >
                  Registrar
                </button>
              </div>
              <br/>
              <Link to="/BadgeTable">Volver a la lista de badges</Link>
            </div>
          </form>
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default BadgeForm;
