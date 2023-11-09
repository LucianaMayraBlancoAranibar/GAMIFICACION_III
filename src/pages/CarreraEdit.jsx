
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import ModalConfirmacion from "../partials/ModalConfirmacion";

function CarreraEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [idDepartment, setidDepartment] = useState("");
  const [carrera, setcarrera] = useState({
    CareersName: "",
    idDepartment: "",
  });
  const [Usuario, setUsuario] = useState("");
  const [CareersNameError, setCareersNameError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!carrera.CareersName) {
      setCareersNameError("El nombre del carrera es obligatorio");
      isValid = false;
    } else if (carrera.CareersName.length < 3 || carrera.CareersName.length > 15) {
      setCareersNameError("El nombre del carrera debe tener entre 3 y 15 caracteres");
      isValid = false;
    } else {
      setCareersNameError("");
    }
    return isValid;
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7205/api/Careers/${id}`)
      .then((response) => {
        setcarrera(response.data);
        setidDepartment(response.data.idDepartment);

      })
      .catch((error) => {
        console.log(error);
      });
    
      axios
      .get("https://localhost:7205/api/Careers")
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
    if (name === "idDepartment") {
      setidDepartment(value); // Actualiza idDepartment directamente
    }
    setcarrera((prevcarrera) => ({
      ...prevcarrera,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {

    // Crear un objeto con los datos en formato JSON
    const requestData = {
      idDepartment: id,
      CareersName: carrera.CareersName,
      idDepartment: idDepartment,
    };

    axios
      .put(`https://localhost:7205/api/Careers/${id}`, requestData, {
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
              Editar carrera{" "}
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
                  Nuevo nombre de carrera
                </label>
                <input
                  type="text"
                  name="CareersName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={carrera.CareersName}
                  onChange={handleInputChange}
                />
                {CareersNameError && (
                  <p className="text-red-500">{CareersNameError}</p>)}
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
                    id="idDepartment"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idDepartment}
                    onChange={(e) => setidDepartment(e.target.value)}
                  >
                    {Usuario.map((Usuario) => (
                      <option
                        key={Usuario.idDepartment}
                        value={Usuario.idDepartment}
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
              <Link to="/carreraTable">Volver a la lista de carrera</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CarreraEdit;