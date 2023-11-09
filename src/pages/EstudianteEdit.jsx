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
  const [Carrera, setCarrer] = useState("");
  const [estudiante, setEstudiante] = useState({
    score: "",
    idRank: "",
    firstName: "",
    lastName: "",
    
  });
  const [Usuario, setUsuario] = useState({
    email: "",
    rol: "",
    password: "",
    idCareer: "",
    idAcademicUnity: "",
  });
  const [StudentNameError, setStudentNameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [idAcademicUnityError, setidAcademicUnityError] = useState("");
  const [idCareerError, setidCareerError] = useState("");
  const [scoreError, setScoreError] = useState("");
  const [idRankError, setRankError] = useState("");
  const [existeEmail, setExisteEmail] = useState("");

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

    if (!estudiante.lastName) {
      setlastNameError("El apellido es obligatorio");
      isValid = false;
    } else if (estudiante.lastName.length < 3 || estudiante.lastName.length > 25) {
      isValid = false;
    } else {
      setlastNameError("");
    }

    if (!Usuario.email) {
      setemailError("El email es obligatorio");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Usuario.email)) {
        setemailError("El email no tiene un formato valido");
        isValid = false;
      } else if (existeEmail.includes(Usuario.email)) {
        setemailError("El email ya existe");
        isValid = false;
      } else {
        setemailError("");
      }
    }

    if (!Usuario.password) {
      setpasswordError("La contraseña es obligatorio");
      isValid = false;
    } else if (Usuario.password.length <= 6 || Usuario.password.length > 10) {
      setpasswordError("La contraseña debe tener entre 6 y 10 caracteres");
      isValid = false;
    } else {
      setpasswordError("");
    }

    if (!idCareer) {
      setidCareerError("Debes seleccionar una carrera");
      isValid = false;
    } else {
      setidCareerError("");
    }

    if (!estudiante.idRank) {
      setRankError("Debes seleccionar un rank");
      isValid = false;
    } else {
      setRankError("");
    }

    if (!Usuario.idAcademicUnity) {
      setidAcademicUnityError("Debes seleccionar una carrera");
      isValid = false;
    } else {
      setidAcademicUnityError("");
    }

    return isValid;
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7220/api/StudentUsuario/${id}`)
      .then((response) => {
        setEstudiante(response.data);
        setidUser(response.data.idUser);

      })
      .catch((error) => {
        console.log(error);
      });
    
      axios
      .get("https://localhost:7220/api/StudentUsuario")
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
        score: score,
        idRank: idRank,
        firstName: firstName,
        lastName: lastName,
        email: email,
        rol: rol,
        password: password,
        idCareer: idCareer,
        idAcademicUnity: idAcademicUnity,
    };

    axios
      .put(`https://localhost:7220/api/StudentAchievements/${id}`, requestData, {
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
              Editar Estudiante{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="estudiante.firstName"
                >
                  Nombre del estudiante
                </label>
                <input
                  type="text"
                  id="estudiante.firstName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={estudiante.firstName}
                  onChange={handleInputChange}
                />
                {StudentNameError && (
                  <p className="text-red-500">{StudentNameError}</p>
                )}
                <br />

                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="firstName"
                >
                  Apellido del estudiante
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={estudiante.lastName}
                  onChange={handleInputChange}
                />
                {lastNameError && (
                  <p className="text-red-500">{lastNameError}</p>
                )}
                <br />


                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={Usuario.email}
                  onChange={handleInputChange}
                />
                {emailError && (
                  <p className="text-red-500">{emailError}</p>
                )}
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={Usuario.password}
                  onChange={handleInputChange}
                />
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}

                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idRank"
                >
                  Rank
                </label>
                <input
                  type="text"
                  id="idRank"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={estudiante.idRank}
                  onChange={handleInputChange}
                />
                {idRankError && (
                  <p className="text-red-500">{idRankError}</p>
                )}
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="score"
                >
                  Score
                </label>
                <input
                  type="text"
                  id="score"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={estudiante.score}
                  onChange={handleInputChange}
                />

                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idAcademicUnity"
                >
                  Academia
                </label>
                <input
                  type="text"
                  id="idAcademicUnity"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={Usuario.idAcademicUnity}
                  onChange={handleInputChange}
                />
                {idAcademicUnityError && (
                  <p className="text-red-500">{idAcademicUnityError}</p>
                )}

                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idCareer"
                >
                  Nueva Carrera
                </label>
                <br />
                {Carrera.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idCareer"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idCareer}
                    onChange={(e) => {
                      setidCareer(e.target.value);
                    }}
                  >
                    <option value="">Selecciona una Carrera</option>
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
                {idCareerError && (
                  <p className="text-red-500">{idCareerError}</p>
                )}

                <br />
              </div>
              <br></br>
              <div className="flex justify-left">
                <button
                  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                  type="submit"
                >
                  Registrar
                </button>
              </div>
            </div>
            <br></br>
            <Link to="/EstudianteTable">Volver a la lista de estudiante</Link>
          </form>

        </div>
      </div>
    </div>
  );
}

export default EstudianteEdit;