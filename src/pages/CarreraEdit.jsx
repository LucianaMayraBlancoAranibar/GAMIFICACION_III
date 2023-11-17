import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import ModalConfirmacion from "../partials/ModalConfirmacion";

function CarreraEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [idDepartment, setIdDepartment] = useState("");
  const [career, setCareer] = useState({
    CareerName: "",
    IdDepartment: "",
  });
  const [department, setDepartment] = useState("");
  const [departmentNameError, setDepartmentNameError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!career.CareerName) {
      setDepartmentNameError("El nombre la carrera es obligatorio");
      isValid = false;
    } else if (career.CareerName.length < 3 | career.CareerName.length > 30) {
      setDepartmentNameError("El nombre de la carrera debe tener entre 3 a 30 caracteres");
      isValid = false;
    } else {
      setDepartmentNameError("");
    }
    return isValid;
  };
  useEffect(() => {
    axios
      .get(`https://localhost:7205/api/Careers/${id}`)
      .then((response) => {
        setCareer(response.data);
        setIdDepartment(response.data.IdDepartment);

      })
      .catch((error) => {
        console.log(error);
      });
    
      axios
      .get("https://localhost:7205/api/Departments")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setDepartment(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });    
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "idDepartment") {
      setIdDepartment(value); // Actualiza idDepartment directamente
    }
    setCareer((prevCareer) => ({
      ...prevCareer,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {

    // Crear un objeto con los datos en formato JSON
    const requestData = {
      idCareer: id,
      careerName: career.CareerName,
      idDepartment: idDepartment,
    };

    axios
      .put(`https://localhost:7205/api/Careers/${id}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Carrera editada con éxito:", response);
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
              Editar Carrera{" "}
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
                  Nombre
                </label>
                <input
                  type="text"
                  name="CareerName"
                  maxLength={35}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={career.CareerName}
                  onChange={handleInputChange}
                />
                {departmentNameError && (
                  <p className="text-red-500">{departmentNameError}</p>)}
                <br />
                <label
                  htmlFor="editSucursalName"
                  className="text-gray-900 dark:text-gray-900"
                >
                  Carrera
                </label>
                {department.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idDepartment"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idDepartment}
                    onChange={(e) => setIdDepartment(e.target.value)}
                  >
                    {department.map((department) => (
                      <option
                        key={department.idDepartment}
                        value={department.idDepartment}
                      >
                        {department.departmentName}
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
              <Link to="/CarreraTable">Volver a la lista de carreras</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CarreraEdit;
