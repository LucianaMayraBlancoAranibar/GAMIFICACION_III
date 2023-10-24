import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";

function EstudianteForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setemail] = useState("");
  const [rol, setrol] = useState("3");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [Rank, setRank] = useState("");
  const [idRank, setIdRank] = useState("");
  const [rankName, setRankName] = useState("");
  const [score, setScore] = useState("");
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
  const [scoreError, setScoreError] = useState("");
  const [idRankError, setRankError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if(!firstName){
      setfirstNameError("El nombre es obligatorio");
      isValid = false;
    } else if(firstName.length < 3 || firstName.length > 25) {
      setfirstNameError("El nombre debe tener entre 3 y 25 caracteres")
      isValid = false
    } else {
      setfirstNameError("");
    }

    if(!lastName){
      setlastNameError("El apellido es obligatorio");
      isValid = false;
    } else if(lastName.length < 3 || lastName.length > 25){
      isValid = false;
    } else {
      setlastNameError("");
    }

    if(!email) {
      setemailError("El email es obligatorio");
      isValid = false;
    } else { 
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)) { 
        setemailError("El email no tiene un formato valido");
        isValid = false;
      } else { 
        setemailError("");
      }
    }

    if(!password) {
      setpasswordError("La contraseña es obligatorio");
      isValid = false;
    } else if(password.length <= 6 || password.length > 10) { 
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

    if (!idRank) {
      setRankError("Debes seleccionar un rank");
      isValid = false;
    } else {
      setRankError("");
    }

    if (!idAcademicUnity) {
      setidAcademicUnityError("Debes seleccionar una carrera");
      isValid = false;
    } else {
      setidAcademicUnityError("");
    }

    if(!score){
      setScoreError("Debe poner una puntuación");
      isValid = false;
    } else if(score < 0){
      setScoreError("La puntuacion no puede ser menor a cero");
      isValid =  false;
    } else {
      setScoreError("");
    }
    
    return isValid;
  }

  useEffect(() => {
    axios
      .get("https://localhost:7220/api/Careers")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setCarrer(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });

    axios
      .get("https://localhost:7220/api/AcademicUnities")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setUnidadAcademica(response.data);
      })
      .catch((error) => {
        console.error(error); // Verifica si hay errores en la llamada a la API
      });

  }, []);

  // Función para validar el formulario
  

  async function handleSubmit(event) {
    event.preventDefault();
    if(validateForm()){
      const data = {
        score: score,
        Rank: Rank,
        idRank: idRank,
        rankName: rankName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        rol: rol,
        password: password,
        idCareer: idCareer,
        idAcademicUnity: idAcademicUnity,
      };
      
      try{
        const response = await axios.post(
          "https://localhost:7220/api/StudentUsuario",
          data
        );

        console.log("Estudiante registrado con éxito:", response.data);

        setModalIsOpen(true);
        setScore("");
        setRank("");
        setIdRank("");
        setRankName("");
        setfirstName("");
        setlastName("");
        setemail("");
        setrol("");
        setpassword("");
        setidCareer("");
        setidAcademicUnity("");
      } catch(error){
        console.error("Error al registrar al estudiante:", error)
      }
    };
  }

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
                  Nombre del estudiante
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
                {firstNameError && (
                  <p className="text-red-500">{firstNameError}</p>
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
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
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
                  value={idRank}
                  onChange={(e) => setRank(e.target.value)}
                />
                <br/>
                {idRank.length === 0? (
                  <p>Cargando datos...</p>
                ) : (
                  <select 
                    id="idRank"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idRank}
                    onChange={(e) => {setIdRank(e.target.value);}}>
                      <option value="">Selecction academia</option>
                      {Rank.map((Rank) => (
                        <option 
                          key={Rank.idRank}
                          value={Rank.idRank}>
                            {Rank.rankName}</option>
                      ))}
                  </select>
                )} 
                {idRankError && (
                  <p className="text-red-500">{idRankError}</p>)}
                                
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
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
                {scoreError && (
                  <p className="text-red-500">{scoreError}</p>
                )}

                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idAcademicUnity"
                >
                  Academia
                </label>
                <br/>
                {UnidadAcademica.length === 0? (
                  <p>Cargando datos...</p>
                ) : (
                  <select 
                    id="idAcademicUnity"
                    className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={idAcademicUnity}
                    onChange={(e) => {setidAcademicUnity(e.target.value);}}>
                      <option value="">Selecction academia</option>
                      {UnidadAcademica.map((UnidadAcademica) => (
                        <option 
                          key={UnidadAcademica.idAcademicUnity}
                          value={UnidadAcademica.idAcademicUnity}>{UnidadAcademica.idAcademicUnity}</option>
                      ))}
                  </select>
                )}
                {idAcademicUnityError && (
                  <p className="text-red-500">{idAcademicUnityError}</p>
                )}

                <br />
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="idCareer"
                >
                  Carrera
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
          {/* Modal de confirmación */}
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default EstudianteForm;