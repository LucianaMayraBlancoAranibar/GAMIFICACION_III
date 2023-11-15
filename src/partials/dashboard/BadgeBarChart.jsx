import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const BadgeBarChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Cantidad de Estudiantes',
            data: [],
            backgroundColor: 'rgba(0, 123, 255, 0.5)'
        }]
    });

    useEffect(() => {
        fetch('https://localhost:7205/api/Dashboard/GetBadgeCounts')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Para depurar y ver qué datos estás recibiendo
                if (data && Array.isArray(data)) {
                    setChartData({
                        labels: data.map(d => d.badgeName),
                        datasets: [{
                            label: 'Cantidad de Estudiantes',
                            data: data.map(d => d.count),
                            backgroundColor: 'rgba(0, 123, 255, 0.5)'
                        }]
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return   <div className="w-full max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-center">
      Distribución de Logros por Tipo
    </h2>
    <div className="h-auto">
   
      <Bar data={chartData} />
    </div>
  </div>;
};

export default BadgeBarChart;
