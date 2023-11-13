import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";

function StudentEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [idCareer, setIdCarrer] = useState("");
  const [idAcademicUnity, setIdAcademicUnity] = useState("");
  const [serverError, setServerError] = useState("");
  const [studentUser, setStudentUser] = useState({
    email: "",
    rol: "",
    firstName: "",
    lastName: "",
    idCareer: "",
    idAcademicUnity: "",
  });
  const [Carrera, setCarrer] = useState("");
  const [AcademicUnity, setAcademicUnity] = useState("");

  const [emailError, setemailError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("")

  const validateForm = () => {
    let isValid = true;
  
    if (!studentUser.firstName) {
      setfirstNameError("El nombre es obligatorio");
      isValid = false;
    } else if (studentUser.firstName.length < 3 || studentUser.firstName.length > 25) {
      setfirstNameError("El nombre debe tener entre 3 y 25 caracteres");
      isValid = false;
    } else {
      setfirstNameError("");
    }

    if (!studentUser.lastName) {
      setlastNameError("El apellido es obligatorio");
      isValid = false;
    } else if (studentUser.lastName.length < 3 || studentUser.lastName.length > 25) {
      setlastNameError("El apellido debe tener entre 3 y 25 caracteres");
      isValid = false;
    } else {
      setlastNameError("");
    }

    if (!studentUser.email) {
      setemailError("El email es obligatorio");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(studentUser.email)) {
        setemailError("El email no tiene un formato válido");
        isValid = false;
      } else {
        setemailError("");
      }
    }
      
    return isValid;
  };


  useEffect(() => {
    axios
      .get(`https://localhost:7205/api/Students/${id}`)
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setStudentUser(response.data);
        setIdCarrer(response.data.idCareer)
        setIdAcademicUnity(response.data.idAcademicUnity)
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://localhost:7205/api/Careers`)
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setCarrer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://localhost:7205/api/AcademicUnities`)
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

    setStudentUser((prevUserStudent) => ({
      ...prevUserStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {

    // Crear un objeto con los datos en formato JSON
    const requestData = {
      idStudent: id,
      email: studentUser.email,
      rol: studentUser.rol,
      firstName: studentUser.firstName,
      lastName: studentUser.lastName,
      idCareer: idCareer,
      idAcademicUnity: idAcademicUnity,
    };
    axios
      .put(`https://localhost:7205/api/Students/${id}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setServerError(error.response.data);
        } else {
          setServerError("Error al registrar el estudiante.");
        }
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
              Editar Estudiante{" "}
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
                  maxLength={35}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={studentUser.firstName}
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
                  maxLength={60}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={studentUser.lastName}
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
                  maxLength={40}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={studentUser.email}
                  onChange={handleInputChange}
                />
                {emailError && (
                  <p className="text-red-500">{emailError}</p>)}
                {serverError && <p className="text-red-500">{serverError}</p>}
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
              <Link to="/StudentTable">Volver a la lista de estudiantes</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentEdit;


