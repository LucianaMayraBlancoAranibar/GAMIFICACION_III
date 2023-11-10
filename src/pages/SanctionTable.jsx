import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

function SanctionsTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sanctions, setSanctions] = useState([]);

  useEffect(() => {
    // Obtener la lista de sanciones desde la API y almacenarla en el estado `sanctions`
    const fetchSanctions = async () => {
      try {
        const response = await axios.get("https://localhost:7205/api/Sanctions");
        setSanctions(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de sanciones:", error);
      }
    };

    fetchSanctions();
  }, []);

  const handleDelete = async (id) => {
    try {
  
      await axios.delete(`https://localhost:7205/api/Sanctions/${id}`);

      setSanctions(sanctions.filter((sanction) => sanction.id !== id));
    } catch (error) {
      console.error(`Error al eliminar la sanción con ID ${id}:`, error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <h1 className="text-2xl font-semibold mb-4">Lista de Sanciones</h1>
          <div className="mr-10 grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Link to="/SanctionForm"> 
              <button  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                Añadir Sancion
              </button>
            </Link>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Valor de la Sanción
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ID del Estudiante
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {sanctions.map((sanction) => (
                  <tr key={sanction.id}>
                    <td className="px-6 py-4">{sanction.description}</td>
                    <td className="px-6 py-4">{sanction.sanction1}</td>
                    <td className="px-6 py-4">{sanction.idStudent}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(sanction.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SanctionsTable;
