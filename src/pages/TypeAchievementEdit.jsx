import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalEdit";
import { useParams, Link } from "react-router-dom";

function TypeAchievementEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    IdTypeAchievement: "", // El ID del logro a editar
    NameTypeAchievement: "",
    Image: null,
    IdAdministrator: "", // ID del administrador
  });
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchTypeAchievementData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7205/api/TypeAchievements/${id}`
        );
        const typeAchievementData = response.data;

        setFormData({
          IdTypeAchievement: typeAchievementData.idTypeAchievement,
          NameTypeAchievement: typeAchievementData.nameTypeAchievement || "",
          IdAdministrator: typeAchievementData.idAdministrator || "",
          Image: typeAchievementData.imagePath || ""
        });
      } catch (error) {
        console.error("Error al cargar los datos del tipo de logro:", error);
      }
    };

    fetchTypeAchievementData();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setFormData({ ...formData, Image: file });
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("IdTypeAchievement", id);
    data.append("NameTypeAchievement", formData.NameTypeAchievement);
    data.append("Image", formData.Image);
    data.append("IdAdministrator", formData.IdAdministrator);
    
    try {
        const response = await axios.put(
            `https://localhost:7205/api/TypeAchievements/${id}`,
            data
        );
        // ... manejo de la respuesta ...
    } catch (error) {
        console.error("Error al enviar la solicitud:", error.response);
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
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Editar Tipo de logro{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="NameTypeAchievement">
                Nombre del tipo de logro:
              </label>
              <input
                type="text"
                id="NameTypeAchievement"
                maxLength={30}
                name="NameTypeAchievement"
                value={formData.NameTypeAchievement}
                className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    NameTypeAchievement: e.target.value,
                  })
                }
              />

              {errors.NameTypeAchievement && (
                <p className="text-red-500">{errors.NameTypeAchievement}</p>
              )}
            </div>
            <br></br>

            <div>
              <label htmlFor="Image">Seleccione una imagen:</label>
              <input
                type="file"
                id="Image"
                name="Image"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
              />
              {/* Mostrar mensaje de error si existe */}
              {errors.Image && <p className="text-red-500">{errors.Image}</p>}
            </div>
            <br></br>
            <button
              className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
              type="submit"
            >
              Actualizar
            </button>
            <br></br>
            <br></br>
            <Link to="/TypeAchievementTable">
              Volver a la lista de Tipos de logros
            </Link>
          </form>
          {/* Modal de confirmación */}
          <ModalConfirmacion isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default TypeAchievementEdit;
