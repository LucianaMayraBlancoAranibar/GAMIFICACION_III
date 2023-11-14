import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const RankHeatMap = () => {
    const [chartData, setChartData] = useState({
        // Estado inicial apropiado para evitar errores en el renderizado inicial
        labels: [],
        datasets: [{
            label: 'Cantidad de Estudiantes',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    });

    useEffect(() => {
        fetch('https://localhost:7205/api/Dashboard/GetStudentRankDistribution')
            .then(response => response.json())
            .then(data => {
                // Asegúrate de que 'data' sea un array y tenga los elementos que esperas
                if (Array.isArray(data)) {
                    setChartData({
                        labels: data.map(d => d.rank),
                        datasets: [{
                            label: 'Cantidad de Estudiantes',
                            data: data.map(d => d.count),
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }]
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const options = {
        maintainAspectRatio: true, // Mantén la proporción del gráfico
        aspectRatio: 2, // Define la relación de aspecto deseada
        // ... cualquier otra opción que necesites
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Distribución de Rangos de Estudiantes</h2>
        <div className="relative" style={{ height: '400px' }}> {/* o cualquier altura que funcione mejor para ti */}
            <Bar data={chartData} options={options} />
        </div>
    </div>
    );
};

export default RankHeatMap;
