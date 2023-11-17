import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";

function SanctionsTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sanctions, setSanctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSanctions = sanctions.filter((sanction) =>
    sanction.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchSanctions = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7205/api/Sanctions"
        );
        const sanctionsWithNames = await Promise.all(
          response.data.map(async (sanction) => {
            // Suponiendo que tienes una endpoint para obtener los detalles del estudiante por su ID
            const studentResponse = await axios.get(
              `https://localhost:7205/api/Students/${sanction.idStudent}`
            );
            return {
              ...sanction,
              studentName:
                studentResponse.data.firstName +
                " " +
                studentResponse.data.lastName, // Asegúrate de que estos campos correspondan a los nombres de los campos en la respuesta de tu API
            };
          })
        );
        setSanctions(sanctionsWithNames);
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
    } catch (error) {
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
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm mb-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Lista de Sanciones
          </h1>
          <div className="mr-10 grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Link to="/SanctionForm">
              <button className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                Añadir Sancion
              </button>
            </Link>
          </div>
          <div className="my-4">
            <input
              type="text"
              className="w-3/4 p-2 border rounded"
              placeholder="Buscar por nombre del estudiante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {filteredSanctions.map((sanction) => (
                  <tr
                    key={sanction.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{sanction.description}</td>
                    <td className="px-6 py-4">{sanction.sanction1}</td>
                    <td className="px-6 py-4">{sanction.studentName}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-red-500 text-white p-2 rounded"
                        onClick={() => handleDelete(sanction.id)}
                      >
                        <BsTrashFill />
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
