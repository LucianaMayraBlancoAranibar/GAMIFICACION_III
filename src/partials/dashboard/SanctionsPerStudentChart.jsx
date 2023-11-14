import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const SanctionsPerStudentChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Número de Sanciones',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }]
    });

    useEffect(() => {
        fetch('https://localhost:7205/api/Dashboard/GetSanctionsPerStudent')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setChartData({
                        labels: data.map(d => d.fullName), // Actualizado para usar FullName
                        datasets: [{
                            label: 'Número de Sanciones',
                            data: data.map(d => d.sanctionCount),
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        }]
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='w-full max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow'>
            <h3 className="text-xl font-semibold leading-tight mb-4 text-center">Sanciones por Estudiante</h3>
            <div className="h-96"> {/* Define una altura para el contenedor del gráfico */}
                <Bar data={chartData} options={{ maintainAspectRatio: true }} />
            </div>
        </div>
    );
};

export default SanctionsPerStudentChart;
