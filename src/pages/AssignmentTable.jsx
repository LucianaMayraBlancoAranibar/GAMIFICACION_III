import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { BsTrashFill } from "react-icons/bs";

function AssignmentTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("https://localhost:7205/api/StudentAchievements/AllAssignments")
      .then((response) => {
        console.log("Asignaciones recibidas:", response.data);
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
        setErrorMessage("Error al cargar asignaciones.");
      });
  }, []);

  const handleDelete = () => {
    if (assignmentToDelete === null) {
      console.error("No hay asignación para eliminar");
      return;
    }

    axios
      .delete(
        `https://localhost:7205/api/StudentAchievements/${assignmentToDelete}`
      )
      .then(() => {
        setAssignments((currentAssignments) =>
          currentAssignments.filter(
            (assignment) => assignment.id !== assignmentToDelete
          )
        );

        setAssignmentToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting assignment:", error);
        setErrorMessage("Error al eliminar la asignación.");
        setAssignmentToDelete(null);
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm mb-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Lista de Logros Asignados
          </h1>
          <div className="mr-10 grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Link to="/StudentAchievement">
              <button className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                Asignar Logro
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

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">
                      nombre del estudiante
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">logro</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">puntos</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Acciones</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {filteredAssignments.map((assignment) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={assignment.id}
                  >
                    <td className="px-6 py-4">{assignment.studentName}</td>
                    <td className="px-6 py-4">{assignment.achievementName}</td>
                    <td className="px-6 py-4">{assignment.points}</td>
                    <td className="px-6 py-4 text-left">
                      <button
                        className="px-4 py-4 ml-3 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-gray-600"
                        onClick={() => setAssignmentToDelete(assignment.id)}
                      >
                        <BsTrashFill />
                      </button>
                      {/* 
                      <Link to={`/AssigmentEdit/${assignment.id}`}>
                        <button className="px-4 py-4 mr-4 leading-5 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-500 focus:outline-none focus:bg-gray-600">
                          Editar
                        </button>
                      </Link> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {assignmentToDelete && (
            <div className="bg-white p-4 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p>¿Seguro que deseas eliminar esta asigancion?</p>
              <div className="mt-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 mx-1"
                  onClick={handleDelete}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-2 py-1 mx-1"
                  onClick={() => setAssignmentToDelete(null)} // Cancelar la eliminación
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

export default AssignmentTable;
