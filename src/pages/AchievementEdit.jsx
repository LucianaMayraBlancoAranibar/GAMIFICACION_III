import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useParams } from "react-router-dom";
import ModalConfirmacion from "../partials/ModalConfirmacion";

function AchievementEdit() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    NameAchievemt: "",
    Punctuation: 0,
    ProjectName: "",
    IdTypeAchievement: 0,
  });
  const [achievementTypes, setAchievementTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    Axios.get("https://localhost:7205/api/TypeAchievements")
      .then((response) => {
        setAchievementTypes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener tipos de logro:", error);
      });

    Axios.get(`https://localhost:7205/api/Achievements/${id}`)
      .then((response) => {
        const achievementData = response.data;
        setFormData({
          NameAchievemt: achievementData.nameAchievemt || "",
          Punctuation: achievementData.punctuation || 0,
          ProjectName: achievementData.projectName || "",
          IdTypeAchievement: achievementData.idTypeAchievement || 0,
        });
      })
      .catch((error) => {
        console.error("Error al obtener los datos del logro:", error);
      });
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();

    // Realizar validaciones antes de enviar los datos
    const validationErrors = {};

    if (!formData.NameAchievemt) {
      validationErrors.NameAchievemt = "El nombre del logro es requerido.";
    }
    if (!formData.ProjectName) {
      validationErrors.ProjectName = "El nombre del proyecto es requerido.";
    }
    if (formData.Punctuation <= 0) {
      validationErrors.Punctuation = "La puntuación debe ser mayor que cero.";
    }
    if (formData.IdTypeAchievement <= 0) {
      validationErrors.IdTypeAchievement =
        "Debes seleccionar un tipo de logro.";
    }

    if (Object.keys(validationErrors).length > 0) {
      // Si hay errores, actualizar el estado de errores y detener el envío del formulario.
      setErrors(validationErrors);
      return;
    }

    // Si no hay errores, continuar con el envío del formulario
    Axios.put(`https://localhost:7205/api/Achievements/${id}`, formData)
      .then((response) => {
        console.log("Logro actualizado con éxito:", response.data);
        setModalIsOpen(true);
        // Puedes mostrar un mensaje de éxito o redirigir al usuario a la lista de logros aquí
      })
      .catch((error) => {
        console.error("Error al actualizar el logro:", error);
        // Puedes mostrar un mensaje de error o manejar el error de otra manera
      });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Limpiar los errores cuando el usuario comienza a corregir los campos
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
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
              Editar Logro
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
                {errors.NameAchievemt && (
                  <p className="text-red-600">{errors.NameAchievemt}</p>
                )}
              </div>
              <br></br>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="Punctuation"
                >
                  Puntuación
                </label>
                <input
                  type="number"
                  id="Punctuation"
                  name="Punctuation"
                  value={formData.Punctuation}
                  onChange={handleInputChange}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.Punctuation && (
                  <p className="text-red-500 text-sm">{errors.Punctuation}</p>
                )}
              </div>
              <br></br>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-900"
                  htmlFor="ProjectName"
                >
                  Nombre del Proyecto
                </label>
                <input
                  type="text"
                  id="ProjectName"
                  name="ProjectName"
                  value={formData.ProjectName}
                  onChange={handleInputChange}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.ProjectName && (
                  <p className="text-red-600">{errors.ProjectName}</p>
                )}
              </div>
              <br></br>
              <div>
                <label htmlFor="IdTypeAchievement">Tipo de Logro</label>
                <select
                  id="IdTypeAchievement"
                  name="IdTypeAchievement"
                  value={formData.IdTypeAchievement}
                  onChange={handleInputChange}
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="">Selecciona un Tipo de Logro</option>
                  {achievementTypes.map((type) => (
                    <option
                      key={type.idTypeAchievement}
                      value={type.idTypeAchievement}
                    >
                      {type.nameTypeAchievement}
                    </option>
                  ))}
                </select>
                {errors.IdTypeAchievement && (
                  <p className="text-red-500 text-sm">
                    {errors.IdTypeAchievement}
                  </p>
                )}
              </div>
              <br></br>
              <div className="flex justify-left">
                <button
                  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                  type="submit"
                >
                  Actualizar
                </button>
              </div>
            </div>
            <br></br>
            <br></br>
            <Link to="/AchievementTable">Volver a la lista de Logros</Link>
          </form>
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default AchievementEdit;
