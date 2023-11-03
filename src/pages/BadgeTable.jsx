import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BadgesTable = () => {
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get('https://localhost:7205/api/Badges');
        setBadges(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching badges:', error);
        setIsLoading(false);
      }
    };

    fetchBadges();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
     <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              ID Badge
            </th>
            <th scope="col" className="py-3 px-6">
              Badge Name
            </th>
            <th scope="col" className="py-3 px-6">
              Level
            </th>
            <th scope="col" className="py-3 px-6">
              Points
            </th>
            <th scope="col" className="py-3 px-6">
              Image
            </th>
            <th scope="col" className="py-3 px-6">
              Type Achievement ID
            </th>
          </tr>
        </thead>
        <tbody>
          {badges.map((badge) => (
            <tr key={badge.idBadge} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">{badge.idBadge}</td>
              <td className="py-4 px-6">{badge.badgeName}</td>
              <td className="py-4 px-6">{badge.badgeLevel}</td>
              <td className="py-4 px-6">{badge.points}</td>
              <td className="py-4 px-6">
                <img
                     src={badge.imagePath}
                  alt={`Badge ${badge.badgeLevel}`}
                  className="w-12 h-12 rounded-full" // you can adjust the size as needed
                />
              </td>
              <td className="py-4 px-6">{badge.idTypeAchievement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default BadgesTable;
