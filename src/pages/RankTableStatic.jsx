import React, { useState, useEffect } from "react";
import axios from "axios";

const RankTable = () => {
  const [ranks, setRanks] = useState([]);

  // Definir aquí los IDs de los rangos visibles
  const visibleRanks = [6, 9, 11, 15, 18];

  useEffect(() => {
    axios
      .get("https://localhost:7205/api/Ranks")
      .then((response) => {
        console.log("Datos de la API:", response.data); // Esto mostrará los datos de la API en la consola
        const filteredRanks = response.data.filter((rank) =>
          visibleRanks.includes(rank.idRank)
        );
        console.log("Rangos filtrados:", filteredRanks); // Esto mostrará los rangos después de filtrar
        setRanks(filteredRanks);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const numbersForLevels = [
    [154, 924, 1694, 2464, 3234], // Números para el Nivel 1
    [308, 1078, 1848, 2618, 3388], // Números para el Nivel 2
    [462, 1232, 2002, 2772, 3542], // Números para el Nivel 3
    // ... más niveles si es necesario
  ];

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase">
              Niveles de Rank
            </th>
            {ranks.map((rank, index) => (
              <th
                key={index}
                className="px-6 py-3 text-xs font-semibold tracking-wider text-center uppercase"
              >
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={rank.imagePath}
                    alt={rank.nameRank}
                    className="h-12 w-12 mb-2 rounded-full shadow-lg"
                  />
                  <span>{rank.nameRank}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {numbersForLevels.map((numbers, levelIndex) => (
            <tr key={levelIndex}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                Nivel {levelIndex + 1}
              </td>
              {numbers.map((num, index) => (
                <td
                  key={index}
                  className="px-6 py-4 text-gray-500 whitespace-nowrap text-center"
                >
                  {num}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankTable;
