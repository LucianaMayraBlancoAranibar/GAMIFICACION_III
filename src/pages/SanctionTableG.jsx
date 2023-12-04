import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarGestor from "../partials/SidebarGestor";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import { BsTrashFill } from 'react-icons/bs';

function SanctionsTableG() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sanctions, setSanctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sanctionToDelete, setSanctionToDelete] = useState(null);

  useEffect(() => {
    // Obtener la lista de sanciones desde la API y almacenarla en el estado `sanctions`
    const fetchSanctions = async () => {
      try {
        const response = await axios.get("https://localhost:7205/api/Sanctions");
        setSanctions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la lista de sanciones:", error);
        setError("Error al cargar las sanciones.");
        setLoading(false);
      }
    };

    fetchSanctions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7205/api/Sanctions/${id}`);
      setSanctions(sanctions.filter((sanction) => sanction.id !== id));
      setSanctionToDelete(null);
    } catch (error) {
      setSanctionToDelete(null);
      console.error(`Error al eliminar la sanción con ID ${id}:`, error);
    }
  };

  if (loading) {
    return <p>Cargando sanciones...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarGestor sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm mb-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Lista de Sanciones</h1>
          <div className="mr-10 grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
           
          </div>
          <br></br>
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
                    Nombre del Estudiante
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
                    <td className="px-6 py-4">{sanction.sanctionValue}</td>
                    <td className="px-6 py-4">{sanction.studentName}</td>
                    <td className="px-6 py-4">
                      <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleDelete(sanction.id)}>
                      <BsTrashFill /> 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sanctionToDelete && (
            <div className="bg-white p-4 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p>¿Seguro que deseas eliminar esta Departamento?</p>
              <div className="mt-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 mx-1"
                  onClick={handleDelete}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-2 py-1 mx-1"
                  onClick={() => setSanctionToDelete(null)} // Cancelar la eliminación
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SanctionsTableG;
