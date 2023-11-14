import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarGestor from "../partials/SidebarGestor";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import { AiFillEdit } from 'react-icons/ai'; 
import { BsTrashFill } from 'react-icons/bs'; 

function AchievementTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [achievementToDelete, setAchievementToDelete] = useState(null);

  useEffect(() => {
   
    axios
      .get("https://localhost:7205/api/Achievements")
      .then((response) => {
        console.log(response.data); // Verifica los datos que obtienes
        setAchievements(response.data);
      })
      .catch((error) => {
        console.error(error); 
      });
  }, []);

  const handleDeleteAchievement = () => {
    if (achievementToDelete) {

      const achievementToDeleteIndex = achievements.findIndex(
        (achievement) => achievement.idAchievement === achievementToDelete
      );
  
      if (achievementToDeleteIndex === -1) {
        console.error("Logro no encontrado");
        setAchievementToDelete(null); 
        return;
      }
 
      axios
        .delete(`https://localhost:7205/api/Achievements/${achievementToDelete}`)
        .then((response) => {
          setAchievements((prevAchievements) =>
            prevAchievements.filter(
              (achievement) => achievement.idAchievement !== achievementToDelete
            )
          );
          setAchievementToDelete(null); 
        })
        .catch((error) => {
          console.error(error);
          setAchievementToDelete(null); 
        });
    }
  };
  

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarGestor sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm mb-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Lista de Logros</h1>
        
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">
                      Nombre de Logro
                    </div>
                  </th>
                 
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {achievements.map((achievement) => (
                  <tr
                    key={achievement.idAchievement}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{achievement.nameAchievemt}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {achievementToDelete && (
            <div className="bg-white p-4 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p>¿Seguro que deseas eliminar este logro?</p>
              <div className="mt-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 mx-1"
                  onClick={handleDeleteAchievement}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-2 py-1 mx-1"
                  onClick={() => setAchievementToDelete(null)}
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

export default AchievementTable;
