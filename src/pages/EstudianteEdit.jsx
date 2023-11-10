import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function EstudianteEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [Carrera, setCarrera] = useState([]);
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
    idUser: "",
  });
  const [StudentNameError, setStudentNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [idAcademicUnityError, setIdAcademicUnityError] = useState("");
  const [idCareerError, setIdCareerError] = useState("");
  const [scoreError, setScoreError] = useState("");
  const [idRankError, setIdRankError] = useState("");
  const [existeEmail, setExisteEmail] = useState(false);

  useEffect(() => {
    axios
      .get(`https://localhost:7220/api/StudentUsuario/${id}`)
      .then((response) => {
        const { score, idRank, firstName, lastName, idUser, email, idCareer, idAcademicUnity } = response.data;
        setEstudiante({
          score,
          idRank,
          firstName,
          lastName,
        });
        setUsuario((prevUsuario) => ({
          ...prevUsuario,
          idUser,
          email,
          idCareer,
          idAcademicUnity,
        }));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://localhost:7220/api/Careers")
      .then((response) => {
        setCarrera(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "idUser" || name === "idCareer" || name === "idAcademicUnity") {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        [name]: value,
      }));
    } else {
      setEstudiante((prevEstudiante) => ({
        ...prevEstudiante,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!estudiante.firstName) {
      setStudentNameError("El nombre del estudiante es obligatorio");
      isValid = false;
    } else if (
      estudiante.firstName.length < 3 ||
      estudiante.firstName.length > 15
    ) {
      setStudentNameError(
        "El nombre del estudiante debe tener entre 3 y 15 caracteres"
      );
      isValid = false;
    } else {
      setStudentNameError("");
    }

    if (!estudiante.lastName) {
      setLastNameError("El apellido es obligatorio");
      isValid = false;
    } else if (estudiante.lastName.length < 3 || estudiante.lastName.length > 25) {
      setLastNameError("El apellido debe tener entre 3 y 25 caracteres");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!Usuario.email) {
      setEmailError("El email es obligatorio");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Usuario.email)) {
        setEmailError("El email no tiene un formato válido");
        isValid = false;
      } else if (existeEmail) {
        setEmailError("El email ya existe");
        isValid = false;
      } else {
        setEmailError("");
      }
    }

    if (!Usuario.password) {
      setPasswordError("La contraseña es obligatoria");
      isValid = false;
    } else if (Usuario.password.length < 6 || Usuario.password.length > 10) {
      setPasswordError("La contraseña debe tener entre 6 y 10 caracteres");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!Usuario.idCareer) {
      setIdCareerError("Debes seleccionar una carrera");
      isValid = false;
    } else {
      setIdCareerError("");
    }

    if (!estudiante.idRank) {
      setIdRankError("Debes seleccionar un rank");
      isValid = false;
    } else {
      setIdRankError("");
    }

    if (!Usuario.idAcademicUnity) {
      setIdAcademicUnityError("Debes seleccionar una unidad académica");
      isValid = false;
    } else {
      setIdAcademicUnityError("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const requestData = {
        score: estudiante.score,
        idRank: estudiante.idRank,
        firstName: estudiante.firstName,
        lastName: estudiante.lastName,
        email: Usuario.email,  // Aquí utilizas el email del estado Usuario
        // ... (resto de los datos)
      };

      axios
        .put(`https://localhost:7220/api/StudentUsuario/${id}`, requestData, {
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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Editar Estudiante
            </h1>
          </div>
          <br />
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
                  name="firstName"
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
                  htmlFor="lastName"
                >
                  Apellido del estudiante
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
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
                  name="email"
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
                  htmlFor="idAcademicUnity"
                >
                  Academia
                </label>
                <input
                  type="text"
                  id="idAcademicUnity"
                  name="idAcademicUnity"
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
                    name="idCareer"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={Usuario.idCareer}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona una Carrera</option>
                    {Carrera.map((carrera) => (
                      <option key={carrera.idCareer} value={carrera.idCareer}>
                        {carrera.careerName}
                      </option>
                    ))}
                  </select>
                )}
                {idCareerError && (
                  <p className="text-red-500">{idCareerError}</p>
                )}

                <br />
              </div>
              <br />
              <div className="flex justify-left">
                <button
                  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                  type="submit"
                >
                  Registrar
                </button>
              </div>
            </div>
            <br />
            <Link to="/EstudianteTable">Volver a la lista de estudiantes</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EstudianteEdit;
