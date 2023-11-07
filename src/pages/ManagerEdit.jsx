
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";

function ManagerEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [idCareer, setIdCarrer] = useState("");
  const [idAcademicUnity, setIdAcademicUnity] = useState("");
  const [userManager, setUserManager] = useState({
    email: "",
    rol: "",
    password: "",
    firstName: "",
    lastName: "",
    idCareer: "",
    idAcademicUnity: "",
  });
  const [Carrera, setCarrer] = useState("");
  const [AcademicUnity, setAcademicUnity] = useState("");

  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("")

  const validateForm = () => {
    let isValid = true;
  
    if (!userManager.firstName) {
      setfirstNameError("El nombre es obligatorio");
      isValid = false;
    } else if (userManager.firstName.length < 3 || userManager.firstName.length > 25) {
      setfirstNameError("El nombre debe tener entre 3 y 25 caracteres");
      isValid = false;
    } else {
      setfirstNameError("");
    }

    if (!userManager.lastName) {
      setlastNameError("El apellido es obligatorio");
      isValid = false;
    } else if (userManager.lastName.length < 3 || userManager.lastName.length > 25) {
      setlastNameError("El apellido debe tener entre 3 y 25 caracteres");
      isValid = false;
    } else {
      setlastNameError("");
    }

    if (!userManager.email) {
      setemailError("El email es obligatorio");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userManager.email)) {
        setemailError("El email no tiene un formato válido");
        isValid = false;
      } else {
        setemailError("");
      }
    }

    if (!userManager.password) {
      setpasswordError("La contraseña es obligatoria");
      isValid = false;
    } else if (userManager.password.length <= 5 || userManager.password.length > 10) {
      setpasswordError("La contraseña debe tener entre 6 y 10 caracteres");
      isValid = false;
    } else {
      setpasswordError("");
    }
      
    return isValid;
  };


  useEffect(() => {
    axios
      .get(`https://localhost:7220/api/Gestors/${id}`)
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setUserManager(response.data);
        setIdCarrer(response.data.idCareer)
        setIdAcademicUnity(response.data.idAcademicUnity)
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://localhost:7220/api/Careers`)
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setCarrer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://localhost:7220/api/AcademicUnities`)
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setAcademicUnity(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "idCareer") {
      setIdCarrer(value); // Actualiza idFaculty directamente
    }
    
    if (name === "idAcademicUnity") {
      setIdCarrer(value); // Actualiza idFaculty directamente
    }

    setUserManager((prevUserManager) => ({
      ...prevUserManager,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {

    // Crear un objeto con los datos en formato JSON
    const requestData = {
      idGestor: id,
      email: userManager.email,
      rol: userManager.rol,
      password: userManager.password,
      firstName: userManager.firstName,
      lastName: userManager.lastName,
      idCareer: idCareer,
      idAcademicUnity: idAcademicUnity,
    };
    axios
      .put(`https://localhost:7220/api/Gestors/${id}`, requestData, {
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
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8 overflow-y-scroll">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Editar Gestor{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  htmlFor="editUserManager"
                  className="text-gray-900 dark:text-gray-900"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={userManager.firstName}
                  onChange={handleInputChange}
                />
                {firstNameError && (
                  <p className="text-red-500">{firstNameError}</p>)}
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="editlastName"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={userManager.lastName}
                  onChange={handleInputChange}
                />
                {lastNameError && (
                  <p className="text-red-500">{lastNameError}</p>)}
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="editemail"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={userManager.email}
                  onChange={handleInputChange}
                />
                {emailError && (
                  <p className="text-red-500">{emailError}</p>)}
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="editpassword"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={userManager.password}
                  onChange={handleInputChange}
                />
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>)}
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="editidCareer"
                >
                  Carrera
                </label>
                <br/>
                {Carrera.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idCareer"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idCareer}
                    onChange={(e) => setIdCarrer(e.target.value)}
                    >
                    {Carrera.map((Carrera) => (
                      <option
                        key={Carrera.idCareer}
                        value={Carrera.idCareer}
                      >
                        {Carrera.careerName}
                      </option>
                    ))}
                  </select>
                )}          
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idAcademicUnity"
                >
                  Unidad Academica
                </label>
                {AcademicUnity.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idAcademicUnity"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idAcademicUnity}
                    onChange={(e) => {
                      setIdAcademicUnity(e.target.value);
                    }} 
                    >
                    {AcademicUnity.map((academicUnity) => (
                      <option
                        key={academicUnity.idAcademicUnity}
                        value={academicUnity.idAcademicUnity}
                      >
                        {academicUnity.academicUnityName}
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
              <Link to="/ManagerTable">Volver a la lista de gestores</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManagerEdit;