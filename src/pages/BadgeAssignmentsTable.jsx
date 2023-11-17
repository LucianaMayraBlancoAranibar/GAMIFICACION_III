import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import { AiFillEdit } from 'react-icons/ai'; 
import { BsTrashFill } from 'react-icons/bs'; 

function BadgeAssignmentsTable() {
  const [badgeAssignments, setBadgeAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [badgeAssignmentToDelete, setBadgeAssignmentToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBadgeAssignments = badgeAssignments.filter(assignment =>
    assignment.studentFullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    axios
      .get("https://localhost:7205/api/BadgeStudents/AllBadgeAssignments")
      .then((response) => {
        setBadgeAssignments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching badge assignments:", error);
        setError("Error al cargar las asignaciones de badges.");
        setLoading(false);
      });
  }, []);
  const handleDelete = () => {
    if (!badgeAssignmentToDelete) return; // Verifica si hay un ID para eliminar

    axios
      .delete(
        `https://localhost:7205/api/BadgeStudents/${badgeAssignmentToDelete}`
      )
      .then(() => {
        // Filtra y actualiza el estado para reflejar la eliminación
        setBadgeAssignments(
          badgeAssignments.filter(
            (assignment) => assignment.id !== badgeAssignmentToDelete
          )
        );
        setBadgeAssignmentToDelete(null); // Restablece el estado
      })
      .catch((error) => {
        // Maneja cualquier error aquí
        console.error("Error deleting badge assignment:", error);
        setError("Error al eliminar la asignación de badge.");
        setBadgeAssignmentToDelete(null); // Restablece el estado en caso de error
      });
  };

  if (loading) {
    return <p>Cargando asignaciones...</p>;
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
            Lista de Badges Asignados
          </h1>
          <div className="mr-10 grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Link to="/BadgeStudent">
              <button className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                Añadir Asignacion
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

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">
                      {" "}
                      Nombre del Estudiante
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">
                      Nombre del Badge
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">
                      Puntos Acumulados
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Acciones</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {filteredBadgeAssignments.map((assignment) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={assignment.Id}
                  >
                    <td className="px-6 py-4">{assignment.studentFullName}</td>
                    <td className="px-6 py-4">{assignment.badgeName}</td>
                    <td className="px-6 py-4">
                      {assignment.accumulatedPoints}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <Link to={`/BadgeAssignmentsEdit/${assignment.id}`}>
                        <button className="px-4 py-4 mr-4 leading-5 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-500 focus:outline-none focus:bg-gray-600">
                        <AiFillEdit />
                        </button>
                      </Link>

                      <button
                        className="px-4 py-4 ml-3 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-gray-600"
                        onClick={() =>
                          setBadgeAssignmentToDelete(assignment.id)
                        }
                      >
                        <BsTrashFill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {badgeAssignmentToDelete && (
            <div className="bg-white p-4 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p>¿Seguro que deseas eliminar esta asignación?</p>
              <div className="mt-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 mx-1"
                  onClick={handleDelete}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-2 py-1 mx-1"
                  onClick={() => setBadgeAssignmentToDelete(null)}
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

export default BadgeAssignmentsTable;
