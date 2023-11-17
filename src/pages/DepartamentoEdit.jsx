import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import ModalConfirmacion from "../partials/ModalConfirmacion";

function DepartamentoEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [idFaculty, setidFaculty] = useState("");
  const [departamento, setDepartamento] = useState({
    DepartmentName: "",
    IdFaculty: "",
  });
  const [Facultad, setFacultad] = useState("");
  const [departmentNameError, setDepartmentNameError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!departamento.DepartmentName) {
      setDepartmentNameError("El nombre del departamento es obligatorio");
      isValid = false;
    } else if (departamento.DepartmentName.length < 3 | departamento.DepartmentName.length > 25) {
      setDepartmentNameError("El nombre del departamento debe tener entre 3 a 25 caracteres");
      isValid = false;
    } else {
      setDepartmentNameError("");
    }
    return isValid;
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7205/api/Departments/${id}`)
      .then((response) => {
        setDepartamento(response.data);
        setidFaculty(response.data.IdFaculty);

      })
      .catch((error) => {
        console.log(error);
      });
    
      axios
      .get("https://localhost:7205/api/Faculties")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setFacultad(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });    
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "idFaculty") {
      setidFaculty(value); // Actualiza idFaculty directamente
    }
    setDepartamento((prevDepartamento) => ({
      ...prevDepartamento,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {

    // Crear un objeto con los datos en formato JSON
    const requestData = {
      idDepartment: id,
      departmentName: departamento.DepartmentName,
      idFaculty: idFaculty,
    };

    axios
      .put(`https://localhost:7205/api/Departments/${id}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Departamento editada con éxito:", response);
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
              Editar departamento{" "}
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
                  Nuevo nombre de departamento
                </label>
                <input
                  type="text"
                  name="DepartmentName"
                  maxLength={30}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={departamento.DepartmentName}
                  onChange={handleInputChange}
                />
                {departmentNameError && (
                  <p className="text-red-500">{departmentNameError}</p>)}
                <br />
                <label
                  htmlFor="editSucursalName"
                  className="text-gray-900 dark:text-gray-900"
                >
                  Nueva carrera
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
                  Guardar Cambios
                </button>

              </div>
              <br></br>
              <br></br>
              <Link to="/DepartamentoTable">Volver a la lista de departamentos</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DepartamentoEdit;