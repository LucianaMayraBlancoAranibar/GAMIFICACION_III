// StudentRankView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentRankView = () => {
  const [studentRank, setStudentRank] = useState({
    // Define un estado inicial que coincida con la estructura del objeto que tu API devuelve
    firstName: '',
    lastName: '',
    score: 0,
    rankName: '',
    subRankName: '',
    imagePath: '',
    // Asegúrate de que estos nombres coincidan con los que tu API devuelve
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = localStorage.getItem('userID');
    if (!studentId) {
      setError('No student ID found');
      setLoading(false);
      navigate('/login');
      return;
    }

    axios.get(`https://localhost:7205/api/Students/${studentId}/GetStudentRank`)
      .then(response => {
        setStudentRank(response.data); // Asegúrate de que la estructura del objeto de respuesta coincida con el estado inicial
      })
      .catch(err => {
        setError('Error fetching student data: ' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  // Asegúrate de que no estés intentando renderizar el componente antes de que los datos estén disponibles
  if (!studentRank) return <div className="text-center p-4">No student rank data available.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Welcome back, {studentRank.firstName} {studentRank.lastName}!</h1>
        <p className="text-xl text-gray-600">Here's your current progress:</p>
      </div>
      <div className="flex flex-wrap justify-around items-stretch gap-4">
        {/* Aquí puedes ajustar las propiedades que estás pasando a InfoCard basadas en los datos que tienes */}
        <InfoCard label="Rank Name" value={studentRank.rankName} icon="🏅" />
        <InfoCard label="Sub Rank Name" value={studentRank.subRankName} icon="🌟" />
        <InfoCard label="Score" value={studentRank.score} icon="✔️" />
        <InfoCard label="Achievements" value={studentRank.achievementsCount} icon="🏆" /> {/* Asegúrate de usar el nombre correcto de la propiedad aquí */}
        {/* Si quieres mostrar la imagen, puedes hacerlo directamente o en otro componente */}
        <div className="flex justify-center items-center">
          <img src={studentRank.imagePath} alt="Rank" className="h-32" />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value, icon }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg w-full md:w-1/4 transform hover:scale-105 transition-transform duration-300">
    <span className="text-6xl">{icon}</span>
    <div className="mt-3">
      <div className="text-gray-700 text-2xl font-semibold">{value}</div>
      <div className="text-gray-500">{label}</div>
    </div>
  </div>
);

export default StudentRankView;
