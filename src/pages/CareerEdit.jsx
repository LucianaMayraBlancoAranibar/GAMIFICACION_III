import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link, useParams } from "react-router-dom";

function CareerEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [department, setDepartment] = useState("");
  const [idDepartment, setIdDepartment] = useState("");
  const [carrera, setCarrera] = useState({
    careerName: "",
    idDepartment: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [careerNameError, setCareerNameError] = useState("");
  const [idDepartmentError, setIdDepartmentError] = useState("");

  useEffect(() => {
    axios
      .get(`https://localhost:7220/api/Careers/${id}`)
      .then((response) => {
        setCarrera(response.data);
        setIdDepartment(response.data.idDepartment);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://localhost:7220/api/Departments")
      .then((response) => {
        setDepartment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "idDepartment") {
      setIdDepartment(value);
    }
    setCarrera((prevCarrera) => ({
      ...prevCarrera,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;

    if (!carrera.careerName) {
      setCareerNameError("El nombre de la carrera es obligatorio");
      isValid = false;
    } else if (carrera.careerName.length < 3 || carrera.careerName.length > 50) {
      setCareerNameError("El nombre de la carrera debe tener entre 3 y 50 caracteres");
      isValid = false;
    } else {
      setCareerNameError("");
    }

    if (!idDepartment) {
      setIdDepartmentError("Debes seleccionar un departamento");
      isValid = false;
    } else {
      setIdDepartmentError("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const requestData = {
        idCareer: id,
        careerName: carrera.careerName,
        idDepartment: idDepartment,
      };

      axios
        .put(`https://localhost:7220/api/Careers/${id}`, requestData, {
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
                  name="careerName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={carrera.careerName}
                  onChange={handleInputChange}
                />
                {careerNameError && (
                  <p className="text-red-500">{careerNameError}</p>
                )}

                <br />
                <label
                  htmlFor="editSucursalName"
                  className="text-gray-900 dark:text-gray-900"
                >
                  Nuevo Departemento
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
                    {department.map((Department) => (
                      <option
                        key={Department.idDepartment}
                        value={Department.idDepartment}
                      >
                        {Department.departmentName}
                      </option>
                    ))}
                  </select>
                )}
                {idDepartmentError && (
                  <p className="text-red-500">{idDepartmentError}</p>
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
              <Link to="/CarreraTable">Volver a la lista de carrera</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CareerEdit;
