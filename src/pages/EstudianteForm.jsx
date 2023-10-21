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
  const [idRank, setIdRank] = useState("");
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

    
      const data = {
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

      try {
        const response = await axios.post(
          "https://localhost:7220/api/StudentUsuario",
          data
        );

        console.log("Estudiante registrado con éxito:", response.data);

        setModalIsOpen(true);
        setScore("");
        setIdRank("");
        setfirstName("");
        setlastName("");
        setemail("");
        setrol("");
        setpassword("");
        setidCareer("");
        setidAcademicUnity("");       
        
        
      } catch (error) {
        //console.error("Error al registrar la estudiante:", error);
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
                  onChange={(e) => setIdRank(e.target.value)}
                />

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
                  value={idAcademicUnity}
                  onChange={(e) => setidAcademicUnity(e.target.value)}
                />

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