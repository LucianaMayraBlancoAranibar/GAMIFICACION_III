import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const AchievementTypeDistributionChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Cantidad de Logros por Tipo',
            data: [],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    });

    useEffect(() => {
        fetch('https://localhost:7205/api/Dashboard/GetAchievementTypeDistribution')
            .then(response => response.json())
            .then(data => {
                setChartData({
                    labels: data.map(item => item.typeName),
                    datasets: [{
                        label: 'Cantidad de Logros por Tipo',
                        data: data.map(item => item.count),
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

  

    return (
        <div className="w-full max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Distribución de Logros por Tipo</h2>
        <div className="h-auto"> {/* Elimina la clase h-96 o cualquier altura fija */}
            <Bar data={chartData}  />
        </div>
    </div>
    );
};

export default AchievementTypeDistributionChart;