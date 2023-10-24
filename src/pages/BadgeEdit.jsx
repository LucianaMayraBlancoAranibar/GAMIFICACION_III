import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";

function BadgeEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [Estudiante, setEstudiante] = useState("");
  const [BadgeImage, setBadgeImage] = useState("");
  const [idStudent, setIdStudent] = useState("");
  const [idBadgeImage, setIdBadgeImage] = useState("");
  const [idAdministrator, setIdAdministrator] = useState("");
  const [badge, setBadge] = useState({
    badgeName: "",
    idStudent: "",
    idAdministrator: "",
    badgeLevel: "",
    idBadgeImage: "",
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7220/api/Badges/${id}`)
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setBadge(response.data);
        setIdAdministrator(response.data.idAdministrator)
        setIdBadgeImage(response.data.idBadgeImage)
        setIdStudent(response.data.idStudent)
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
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

    axios
      .get("https://localhost:7220/api/BadgeImages")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setBadgeImage(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "idStudent") {
      setIdStudent(value);
    }

    if (name === "idAdministrator") {
      setIdAdministrator(value);
    }

    if (name === "idBadgeImage") {
      setIdBadgeImage(value);
    }

    setBadge((prevBadge) => ({
      ...prevBadge,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Crear un objeto con los datos en formato JSON
    const requestData = {
      idBadge: id,
      badgeName: badge.badgeName,
      idStudent: idStudent,
      idAdministrator: idAdministrator,
      badgeLevel: badge.badgeLevel,
      idBadgeImage: idBadgeImage,
    };
    axios
      .put(`https://localhost:7220/api/Badges/${id}`, requestData, {
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
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Editar Badge{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="Name"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="badgeName"
                  name="badgeName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={badge.badgeName}
                  onChange={handleInputChange}
                />
              </div>
              <br></br>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="Nivel"
                >
                  Nivel de Badge
                </label>
                <input
                  type="text"
                  id="badgeLevel"
                  name="badgeLevel"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={badge.badgeLevel}
                  onChange={handleInputChange}
                />
              </div>
              <br></br>
              {BadgeImage.length === 0 ? (
                <p>Cargando datos...</p>
              ) : (
                <div>
                  <label className="text-gray-900 dark:text-gray-900" htmlFor="editidCareer">
                    Imagen
                  </label>
                  <br />
                  <select
                    id="idBadgeImage"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idBadgeImage}
                    onChange={(e) => setIdBadgeImage(e.target.value)}
                  >
                    {BadgeImage.map((badgeimage) => (
                      <option key={badgeimage.idBadgeImage} value={badgeimage.idBadgeImage}>
                        {badgeimage.title}
                      </option>
                    ))}
                  </select>

                  <div className="image-container">
                    {idBadgeImage && (
                      <img
                      src={idBadgeImage ? `/src/images/${BadgeImage.find(badgeimage => badgeimage.idBadgeImage === parseInt(idBadgeImage))?.nameImage}` : ''}
                      alt="imagen no encontrada"
                      />
                    )}
                    {console.log("Valor de idBadgeImage:", idBadgeImage)}
                  </div>
                </div>
              )}
              <br />
              <label
                className="text-gray-900 dark:text-gray-900"
                htmlFor="idStudent"
              >
                Estudiante:
              </label>
              <br />
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
              <br />              <div className="flex justify-left">
                <button
                  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                  type="submit"
                >
                  Actualizar
                </button>
              </div>
              <br />
              <Link to="/BadgeTable">Volver a la lista de badges</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BadgeEdit;
