import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const AchievementDoughnutChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ]
        }]
    });

    useEffect(() => {
        fetch('https://localhost:7205/api/Dashboard/GetAchievementTypeDistribution')
            .then(response => response.json())
            .then(data => {
                // Asegúrate de que 'data' sea un array y tenga los elementos que esperas
                setChartData({
                    labels: data.map(d => d.typeName), // Corregido para usar 'typeName'
                    datasets: [{
                        data: data.map(d => d.count), // Corregido para usar 'count'
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ]
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="p-4 max-w-sm mx-auto bg-white rounded-lg border shadow-md">
            <h3 className="mb-2 text-center font-semibold">Distribución de Logros por Tipo</h3>
            <Doughnut data={chartData} />
        </div>
    );
};

export default AchievementDoughnutChart;
