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
  const [badge, setBadge] = useState({
    badgeName: "",
    idStudent: "",
    idAdministrator: "",
    badgeLevel: "",
    idBadgeImage: "",
  });

  useEffect(() => {
      axios
      .get("https://localhost:7220/api/Students") //CAMBIAR ESTO STEVEN
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setEstudiante(response.data);
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

  function handleSubmit(event) {
    event.preventDefault();
    // Lógica para enviar el formulario con la imagen
  }

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

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
                  id="Name"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
                  id="Nivel"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <br></br>
              <div>
                <label htmlFor="Role">Imagen</label>
                <select
                  id="Role"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="">Selecciona una Imagen</option>
                  <option value="institucion1">Imagen 1</option>
                  <option value="institucion2">Imagen 2</option>
                  <option value="institucion3">Imagen 3</option>
                </select>
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
                <br/>              <div className="flex justify-left">
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
        </div>
      </div>
    </div>
  );
}

export default BadgeEdit;
