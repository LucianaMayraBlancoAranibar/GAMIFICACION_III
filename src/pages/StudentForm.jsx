import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";

function StudentForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setemail] = useState("");
  const [rol, setrol] = useState("3");
  const [score, setScore] = useState("1");
  const [idRank, setIdRank] = useState("1");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [idAcademicUnity, setidAcademicUnity] = useState("");
  const [idCareer, setidCareer] = useState("");
  const [Carrera, setCarrer] = useState("");
  const [UnidadAcademica, setUnidadAcademica] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Validacion
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [idAcademicUnityError, setidAcademicUnityError] = useState("");
  const [idCareerError, setidCareerError] = useState("");
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    let isValid = true;
  
    if (!firstName) {
      setfirstNameError("El nombre es obligatorio");
      isValid = false;
    } else if (firstName.length < 3 || firstName.length > 25) {
      setfirstNameError("El nombre debe tener entre 3 y 25 caracteres");
      isValid = false;
    } else {
      setfirstNameError("");
    }

    if (!lastName) {
      setlastNameError("El apellido es obligatorio");
      isValid = false;
    } else if (lastName.length < 3 || lastName.length > 25) {
      setlastNameError("El apellido debe tener entre 3 y 25 caracteres");
      isValid = false;
    } else {
      setlastNameError("");
    }

    if (!email) {
      setemailError("El email es obligatorio");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setemailError("El email no tiene un formato válido");
        isValid = false;
      } else {
        setemailError("");
      }
    }

    if (!password) {
      setpasswordError("La contraseña es obligatoria");
      isValid = false;
    } else if (password.length < 6 ) {
      setpasswordError("La contraseña debe tener mas de 6 caracteres");
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

    if (!idAcademicUnity) {
      setidAcademicUnityError("Debes seleccionar una carrera");
      isValid = false;
    } else {
      setidAcademicUnityError("");
    }
    
    return isValid;
  };

  useEffect(() => {
    axios
      .get("https://localhost:7205/api/Careers")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setCarrer(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });

    axios
      .get("https://localhost:7205/api/AcademicUnities")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setUnidadAcademica(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });

  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {

      const data = {
        email: email,
        rol: rol,
        score: score,
        idRank: idRank,
        password: password,
        firstName: firstName,
        lastName: lastName,
        idAcademicUnity: idAcademicUnity,
        idCareer: idCareer,
      };

      try {
        const response = await axios.post(
          "https://localhost:7205/api/Students",
          data
        );

        console.log("Estudiante registrado con éxito:", response.data);

        setModalIsOpen(true);
        setemail("");
        setrol("");
        setScore("");
        setIdRank("");
        setpassword("");
        setfirstName("");
        setlastName("");
        setidAcademicUnity("");
        setidCareer("");
      } catch (error) {
        if (error.response && error.response.data) {
          setServerError(error.response.data);
        } else {
          setServerError("Error al registrar el gestor.");
        }
      }
    }
  }

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
              Nuevo Estudiante{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="firstName"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  id="firstName"
                  maxLength={35}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
                {firstNameError && (
                  <p className="text-red-500">{firstNameError}</p>)}
                <br/>              
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="lastName"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  id="lastName"
                  maxLength={60}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
                {lastNameError && (
                  <p className="text-red-500">{lastNameError}</p>)}
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
                  maxLength={40}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500">{emailError}</p>)}
                {serverError && <p className="text-red-500">{serverError}</p>}
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
                  maxLength={15}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>)}
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idCareer"
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
                  <p className="text-red-500">{idCareerError}</p>)}
                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idAcademicUnity"
                >
                  Unidad Academica
                </label>
                {UnidadAcademica.length === 0 ? (
                  <p>Cargando datos...</p>
                ) : (
                  <select
                    id="idAcademicUnity"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idAcademicUnity}
                    onChange={(e) => {
                      setidAcademicUnity(e.target.value);
                    }} 
                    >
                    <option value="">Selecciona una Carrera</option>
                    {UnidadAcademica.map((UnidadAcademica) => (
                      <option
                        key={UnidadAcademica.idAcademicUnity}
                        value={UnidadAcademica.idAcademicUnity}
                      >
                        {UnidadAcademica.academicUnityName}
                      </option>
                    ))}
                  </select>
                )}
                {idAcademicUnityError && (
                  <p className="text-red-500">{idAcademicUnityError}</p>)}
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
            <Link to="/StudentTable">Volver a la lista de estudiantes</Link>
          </form>
          {/* Modal de confirmación */}
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default StudentForm;