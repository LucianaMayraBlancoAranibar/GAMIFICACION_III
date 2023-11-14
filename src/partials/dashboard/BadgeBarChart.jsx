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

    return <Bar data={chartData} />;
};

export default BadgeBarChart;
