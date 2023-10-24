import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

function RankTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    // Obtener la lista de rangos desde la API y almacenarla en el estado `ranks`
    const fetchRanks = async () => {
      try {
        const response = await axios.get("https://localhost:7187/api/Ranks");
        setRanks(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de rangos:", error);
      }
    };

    fetchRanks();
  }, []);

  const handleEdit = (id) => {
    // Implementa la lógica para editar un rango con el ID proporcionado
  };

  const handleDelete = async (id) => {
    try {
      // Realiza una solicitud DELETE a la API para eliminar el rango con el ID proporcionado
      await axios.delete(`https://localhost:7187/api/Ranks/${id}`);

      // Actualiza la lista de rangos después de eliminar el elemento
      setRanks(ranks.filter((rank) => rank.id !== id));
    } catch (error) {
      console.error(`Error al eliminar el rango con ID ${id}:`, error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <h1 className="text-2xl font-semibold mb-4">Lista de Rangos</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">
                      Nombre del Rango
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">
                      Nombre del Subrango
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Imagen</div>
                  </th>
                  {/* <th>Acciones</th> */}
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {ranks.map((rank) => (
                  <tr key={rank.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                   
                    <td className="px-6 py-4">{rank.nameRank}</td>
                    <td className="px-6 py-4">{rank.nameSubrank}</td>
                    <td className="px-6 py-4">
                      <img
                        src={rank.imagePath}
                        alt={rank.nameRank}
                        width="100"
                      />
                    </td>
                    {/* <td>
                      <button onClick={() => handleEdit(rank.id)}>
                        <Link to={`/rankEdit/${rank.id}`}>Editar</Link>
                      </button>
                      <button onClick={() => handleDelete(rank.id)}>
                        Eliminar
                      </button>
                    </td> */}
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

export default RankTable;
