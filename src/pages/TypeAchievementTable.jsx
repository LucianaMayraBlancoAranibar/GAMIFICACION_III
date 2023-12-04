import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import ModalConfirmacion from "../partials/ModalConfirmacion";

function TypeAchievementTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [typeAchievements, setTypeAchievements] = useState([]);
  const [typeAchievementToDelete, setTypeAchievementToDelete] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTypeAchievements = typeAchievements.filter((typeAchievement) =>
    typeAchievement.nameTypeAchievement
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("https://localhost:7205/api/TypeAchievements")
      .then((response) => {
        setModalIsOpen(true);
        console.log(response.data);
        setTypeAchievements(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleDeleteTypeAchievement = () => {
    if (typeAchievementToDelete) {
      axios
        .delete(
          `https://localhost:7205/api/TypeAchievements/${typeAchievementToDelete}`
        )
        .then((response) => {
          setTypeAchievements((prevFacultadesTypeAchievement) =>
            prevFacultadesTypeAchievement.filter(
              (typeAchievement) =>
                typeAchievement.idTypeAchievement !== typeAchievementToDelete
            )
          );
          setTypeAchievementToDelete(null);
        })
        .catch((error) => {
          console.error(error);
          setTypeAchievementToDelete(null);
        });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm mb-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Lista de Tipos Logros
          </h1>
          <div className="mr-10 grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Link to="/TypeAchievementForm">
              <button
                className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                type="submit"
              >
                Añadir Logro
              </button>
            </Link>
          </div>
          <div className="my-4">
            <input
              type="text"
              className="w-3/4 p-2 border rounded"
              placeholder="Buscar tipo de logro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-bold text-left">Nombre del Logro</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-bold text-left">Imagen</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-bold text-left">Acciones</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-900  divide-y divide-slate-100 dark:divide-slate-700">
                {filteredTypeAchievements.map((typeAchievement) => (
                  <tr
                    key={typeAchievement.idTypeAchievement}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 ">
                      {typeAchievement.nameTypeAchievement}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={typeAchievement.route}
                        alt={typeAchievement.nameTypeAchievement}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-left">
                      <Link
                        to={`/TypeAchievementEdit/${typeAchievement.idTypeAchievement}`}
                      >
                        <button className="px-4 py-4 mr-4 leading-5 text-white transition-colors duration-200 transform  bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:bg-gray-600">
                          <AiFillEdit />
                        </button>
                      </Link>
                      {/* <button
                        className="px-4 py-4 ml-3 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-gray-600"
                        onClick={() =>
                          setTypeAchievementToDelete(
                            typeAchievement.idTypeAchievement
                          )
                        }
                      >
                        <BsTrashFill /> 
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {typeAchievementToDelete && (
            <div className="bg-white p-4 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p>¿Seguro que deseas eliminar este tipo de logro?</p>
              <div className="mt-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 mx-1"
                  onClick={handleDeleteTypeAchievement}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-2 py-1 mx-1"
                  onClick={() => setTypeAchievementToDelete(null)} // Cancelar la eliminación
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

export default TypeAchievementTable;
