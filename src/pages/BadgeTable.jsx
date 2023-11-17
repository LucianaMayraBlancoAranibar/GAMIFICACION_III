import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

const BadgesTable = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [achievementTypes, setAchievementTypes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBadges = badges.filter((badge) =>
    badge.badgeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchBadges = async () => {
      setIsLoading(true);
      try {
        // Obtener los badges
        const response = await axios.get("https://localhost:7205/api/Badges");
        setBadges(response.data);

        // Obtener los tipos de logros
        const typeResponse = await axios.get(
          "https://localhost:7205/api/TypeAchievements"
        );
        const typesMap = {};
        typeResponse.data.forEach((type) => {
          typesMap[type.idTypeAchievement] = type.nameTypeAchievement;
        });
        setAchievementTypes(typesMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchBadges();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative p-4 sm:p-6 rounded-sm mb-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Lista de Badges
          </h1>
          <div className="mr-10 grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <br></br>
            <Link to="/BadgeForm">
              <button className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                Añadir Badge
              </button>
            </Link>
          </div>
          <div className="my-4 ">
            <input
              type="text"
              className="w-3/4 p-2 border rounded"
              placeholder="Buscar por nombre del badge..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Badge Name</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Level</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Points</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">Image</div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="font-semibold text-left">
                      Type Achievement ID
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {filteredBadges.map((badge) => (
                  <tr
                    key={badge.idBadge}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{badge.badgeName}</td>
                    <td className="px-6 py-4">{badge.badgeLevel}</td>
                    <td className="px-6 py-4">{badge.points}</td>
                    <td className="px-6 py-4">
                      <img
                        src={badge.imagePath}
                        alt={`Badge ${badge.badgeLevel}`}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {achievementTypes[badge.idTypeAchivement] ||
                        badge.idTypeAchivement}
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
};

export default BadgesTable;
