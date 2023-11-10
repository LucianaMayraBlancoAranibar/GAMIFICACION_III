import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";

const BadgeCreationForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [badgeName, setBadgeName] = useState("");
  const [idTypeAchievement, setIdTypeAchievement] = useState(null);
  const [tipoLogros, setTipoLogros] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://localhost:7205/api";

  useEffect(() => {
    const cargarTipoLogros = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/TypeAchievements`);
        setTipoLogros(
          response.data.map((tl) => ({
            value: tl.idTypeAchievement,
            label: tl.nameTypeAchievement,
          }))
        );
      } catch (error) {
        console.error("Error cargando los tipos de logro", error);
      } finally {
        setLoading(false);
      }
    };

    cargarTipoLogros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const adminId = localStorage.getItem("userID");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/Badges/CreateDefaults`,
        {
          AdministratorId: adminId,
          BadgeName: badgeName,
          IdTypeAchievement: idTypeAchievement ? idTypeAchievement.value : null,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Hubo un error al crear los badges");
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  function closeModal() {
    setModalIsOpen(false);
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <div className="relative">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear Badge{" "}
            </h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="badgeName"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre del Badge
              </label>
              <input
                type="text"
                id="badgeName"
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="idTypeAchievement"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de Logro
              </label>
              <Select
                id="idTypeAchievement"
                value={idTypeAchievement}
                onChange={setIdTypeAchievement}
                options={tipoLogros}
                className="mt-1 block w-full"
                isClearable={true}
                isSearchable={true}
                isLoading={loading}
              />
            </div>
            <br></br>
            <br></br>
            <div>
              <button
                type="submit"
                className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear Badges"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BadgeCreationForm;
