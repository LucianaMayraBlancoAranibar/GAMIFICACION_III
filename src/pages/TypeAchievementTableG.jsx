import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarGestor from "../partials/SidebarGestor";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import { AiFillEdit } from 'react-icons/ai'; 
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
      <SidebarGestor sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm mb-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Lista de Tipos Logros</h1>
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
                    <div className="font-bold text-left">
                      Nombre del Logro
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-bold text-left">Imagen</div>
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

export default TypeAchievementTable;
