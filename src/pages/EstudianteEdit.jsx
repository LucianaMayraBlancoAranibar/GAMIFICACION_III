import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import ModalConfirmacion from "../partials/ModalConfirmacion";

function EstudianteEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [idUser, setidUser] = useState("");
  const [estudiante, setEstudiante] = useState({
    StudentName: "",
    idUser: "",
  });
  const [Usuario, setUsuario] = useState("");
  const [StudentNameError, setStudentNameError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!estudiante.StudentName) {
      setStudentNameError("El nombre del estudiante es obligatorio");
      isValid = false;
    } else if (estudiante.StudentName.length < 3 || estudiante.StudentName.length > 15) {
      setStudentNameError("El nombre del estudiante debe tener entre 3 y 15 caracteres");
      isValid = false;
    } else {
      setStudentNameError("");
    }
    return isValid;
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7220/api/Usuarios/${id}`)
      .then((response) => {
        setEstudiante(response.data);
        setidUser(response.data.idUser);

      })
      .catch((error) => {
        console.log(error);
      });
    
      axios
      .get("https://localhost:7220/api/Usuarios")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setUsuario(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });    
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "idUser") {
      setidUser(value); // Actualiza idUser directamente
    }
    setEstudiante((prevestudiante) => ({
      ...prevestudiante,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {

    // Crear un objeto con los datos en formato JSON
    const requestData = {
      idDepartment: id,
      StudentName: estudiante.StudentName,
      idUser: idUser,
    };

    axios
      .put(`https://localhost:7220/api/Usuarios/${id}`, requestData, {
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
              Editar estudiante{" "}
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
                  Nuevo nombre de estudiante
                </label>
                <input
                  type="text"
                  name="StudentName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={estudiante.StudentName}
                  onChange={handleInputChange}
                />
                {StudentNameError && (
                  <p className="text-red-500">{StudentNameError}</p>)}
                <br />
                <label
                  htmlFor="editSucursalName"
                  className="text-gray-900 dark:text-gray-900"
                >
                  Nueva carrera
                </label>
                {Usuario.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idUser"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idUser}
                    onChange={(e) => setidUser(e.target.value)}
                  >
                    {Usuario.map((Usuario) => (
                      <option
                        key={Usuario.idUser}
                        value={Usuario.idUser}
                      >
                        {Usuario.facultyName}
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
                  Guardar Cambios
                </button>

              </div>
              <br></br>
              <br></br>
              <Link to="/estudianteTable">Volver a la lista de estudiante</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EstudianteEdit;