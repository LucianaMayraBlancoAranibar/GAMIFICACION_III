import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";

function FacultyEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState({ facultyName: "" }); 
  const [facultad, setFacultad] = useState({
    facultyName: "",
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7205/api/Faculties/${id}`)
      .then((response) => {
        setFacultad(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFacultad((prevFacultad) => ({
      ...prevFacultad,
      [name]: value,
    }));

    if (name === "facultyName" && value.length > 75) {
      setErrors({ ...errors, facultyName: "El nombre de la facultad no debe exceder los 75 caracteres." });
    } else {
      setErrors({ ...errors, facultyName: "" }); 
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    if (facultad.facultyName === "") {
      setErrors({ facultyName: "Este campo es obligatorio." });
      return; 
    }

    const requestData = {
      idFaculty: id,
      facultyName: facultad.facultyName,
    };

    axios
      .put(`https://localhost:7218/api/Faculties/${id}`, requestData, {
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
              Editar Facultad{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  htmlFor="editedFacultyName"
                  className="text-gray-900 dark:text-gray-900"
                >
                  Nuevo Nombre de Facultad
                </label>
                <input
                  type="text"
                  name="facultyName"
                  className={`block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring ${errors.facultyName && "border-red-500"}`} 
                  value={facultad.facultyName}
                  onChange={handleInputChange}
                />
                {errors.facultyName && <p className="text-red-500">{errors.facultyName}</p>} {/* Muestra el mensaje de error */}
              </div>
              <br></br>
              <div className="flex justify-left">
                <button
                  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover-bg-gray-700 focus:outline-none focus:bg-gray-600"
                  type="submit"
                  disabled={!!errors.facultyName} // Deshabilita el botón si hay errores
                >
                  Guardar Cambios
                </button>
              </div>
              <br></br>
              <br></br>
              <Link to="/FacultadTable">Volver a la lista de facultades</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FacultyEdit;
