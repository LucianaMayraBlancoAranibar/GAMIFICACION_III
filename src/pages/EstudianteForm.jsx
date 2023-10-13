import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";

function EstudianteForm() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [email, setemail] = useState("");
    const [rol, setrol] = useState("2");
    const [password, setpassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [Usuario, setUsuario] = useState("");
    const [idAcademicUnity, setidAcademicUnity] = useState("");
    const [idCareer, setidCareer] = useState("");
    const [Carrera, setCarrer] = useState("");
    const [UnidadAcademica, setUnidadAcademica] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [emailError, setemailError] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [firstNameError, setfirstNameError] = useState("");
    const [lastNameError, setlastNameError] = useState("");
    const [idAcademicUnityError, setidAcademicUnityError] = useState("");
    const [idCareerError, setidCareerError] = useState("");

    

    useEffect(() => {
        axios
          .get("https://localhost:7220/api/Usuarios")
          .then((response) => {
            console.log(response.data); // Verifica los datos que obtienes
            setUsuario(response.data);
          })
          .catch((error) => {
            console.error(error); // Verifica si hay errores en la llamada a la API
          });
    
      }, []);
    
        // Función para validar el formulario
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
          } else if (password.length <= 6 || password.length > 10) {
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
      
          if (!idAcademicUnity) {
            setidAcademicUnityError("Debes seleccionar una carrera");
            isValid = false;
          } else {
            setidAcademicUnityError("");
          }
          
          return isValid;
        };
    
      async function handleSubmit(event) {
        event.preventDefault();
    
        if (validateForm()) {
          const data = {
            studentName: studentName,
            studentLastName: studentLastName,
            idUser: idUser,
          };
    
          try {
            const response = await axios.post(
              "https://localhost:7220/api/Students",
              data
            );
    
            console.log("Sucursal registrada con éxito:", response.data);
    
            setModalIsOpen(true);
            setstudentName("");
            setstudentLastName("");
            setidUser("");
          } catch (error) {
            console.error("Error al registrar la sucursal:", error);
          }
        }
      }
    
      function closeModal() {
        setModalIsOpen(false);
      }

      async function handleSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
    
          const data = {
            email: email,
            rol: rol,
            password: password,
            firstName: firstName,
            lastName: lastName,
            idAcademicUnity: idAcademicUnity,
            idCareer: idCareer,
          };
    
          try {
            const response = await axios.post(
              "https://localhost:7220/api/Gestors",
              data
            );
    
            console.log("Gestor registrado con éxito:", response.data);
    
            setModalIsOpen(true);
            setemail("");
            setrol("");
            setpassword("");
            setfirstName("");
            setlastName("");
            setidAcademicUnity("");
            setidCareer("");
          } catch (error) {
            console.error("Error al registrar elGestor:", error);
          }
        }
      }
    
      return (
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
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
                      htmlFor="studentName"
                    >
                      Nombre del estudiante
                    </label>
                    <input
                      type="text"
                      id="studentName"
                      className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={studentName}
                      onChange={(e) => setstudentName(e.target.value)}
                    />
                    {studentNameError && (
                      <p className="text-red-500">{studentNameError}</p>)}
                    <br />

                    <label
                      className="text-gray-900 dark:text-gray-900"
                      htmlFor="studentName"
                    >
                      Apellido del estudiante
                    </label>
                    <input
                      type="text"
                      id="studentLastName"
                      className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={studentLastName}
                      onChange={(e) => setstudentLastName(e.target.value)}
                    />
                    {studentLastNameError && (
                      <p className="text-red-500">{studentLastNameError}</p>)}
                    <br />
                    
                    {idUserError && (
                      <p className="text-red-500">{idUserError}</p>
                    )}

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
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500">{emailError}</p>)}
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
              {/* Modal de confirmación */}
              <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
            </div>
          </div>
        </div>
      );
    }
    
    export default EstudianteForm;