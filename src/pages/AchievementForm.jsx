import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function AchievementForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    NameAchievemt: "",    // Cambiado a "NameAchievemt" para coincidir con el modelo del servidor
    Punctuation: 0,
    ProjectName: "",       // Cambiado a "ProjectName" para coincidir con el modelo del servidor
    IdTypeAchievement: 0, // Asegúrate de proporcionar un valor adecuado para este campo
  });
  const [achievementTypes, setAchievementTypes] = useState([]);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los tipos de logro
    Axios.get("https://localhost:7187/api/TypeAchievements")
      .then((response) => {
        // Almacena los tipos de logro en el estado
        setAchievementTypes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener tipos de logro:", error);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    // Verificar si los campos requeridos están llenos
    if (!formData.NameAchievemt || !formData.ProjectName) {
      console.error("Los campos NameAchievemt y ProjectName son requeridos.");
      return;
    }

    // Enviar datos solo si los campos requeridos están llenos
    Axios.post("https://localhost:7187/api/Achievements", formData)
      .then((response) => {
        console.log("Logro creado con éxito:", response.data);
        // Puedes redirigir o realizar otras acciones después de la creación exitosa
      })
      .catch((error) => {
        console.error("Error al crear el logro:", error);
      });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Nuevo Logro
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="NameAchievemt"
                >
                  Nombre del Logro
                </label>
                <input
                  type="text"
                  id="NameAchievemt"
                  name="NameAchievemt"
                  value={formData.NameAchievemt}
                  onChange={handleInputChange}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <br></br>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="Punctuation"
                >
                  Puntuacion
                </label>
                <input
                  type="number"
                  id="Punctuation"
                  name="Punctuation"
                  value={formData.Punctuation}
                  onChange={handleInputChange}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <br></br>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="ProjectName"
                >
                  Nombre del proyecto
                </label>
                <input
                  type="text"
                  id="ProjectName"
                  name="ProjectName"
                  value={formData.ProjectName}
                  onChange={handleInputChange}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <br></br>
              <div>
                <label htmlFor="IdTypeAchievement">Tipo de logro</label>
                <select
                  id="IdTypeAchievement"
                  name="IdTypeAchievement"
                  value={formData.IdTypeAchievement}
                  onChange={handleInputChange}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="">Selecciona un Tipo de Logro</option>
                  {achievementTypes.map((type) => (
                    <option key={type.idTypeAchievement} value={type.idTypeAchievement}>
                      {type.nameTypeAchievement}
                    </option>
                  ))}
                </select>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default AchievementForm;
