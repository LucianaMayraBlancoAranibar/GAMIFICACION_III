// StudentRankView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentView = () => {
  const [studentRank, setStudentRank] = useState({
   
    firstName: '',
    lastName: '',
    score: 0,
    rankName: '',
    subRankName: '',
    imagePath: '',
    
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = localStorage.getItem('userID');
    if (!studentId) {
      setError('No student ID found');
      setLoading(false);
      navigate('/LoginPage');
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

  if (!studentRank) return <div className="text-center p-4">No student rank data available.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <p className="text-xl text-gray-600">Aquí está tu progreso actual:</p>
      </div>
      <div className="flex flex-wrap justify-around items-stretch gap-4">
        {/* Primer elemento con imagen */}
        <InfoCard
          label="Nombre del Rango"
          value={studentRank.rankName}
          imageSrc={studentRank.imagePath}
          isFirst={true}
        />
        {/* Resto de elementos con iconos */}
        <InfoCard label="Nombre del Sub Rango" value={studentRank.subRankName} icon="🌟" />
        <InfoCard label="Score" value={studentRank.score} icon="✔️" />
        <InfoCard label="Logros" value={studentRank.achievementsCount} icon="🏆" />
      </div>
    </div>
  );
};


const InfoCard = ({ label, value, icon, imageSrc, isFirst }) => (
  <div
    className={`flex flex-col items-center p-6 bg-white rounded-xl shadow-lg w-full md:w-1/4 transform hover:scale-105 transition-transform duration-300 ${
      isFirst ? 'border border-gray-300' : ''
    }`}
  >
    {isFirst ? (
      <img src={imageSrc} alt="Rank" style={{ height: '80px', width: '80px' }} />

    ) : (
      <span className="text-6xl">{icon}</span>
    )}
    <div className="mt-3">
      <div className="text-gray-700 text-2xl font-semibold">{value}</div>
      <div className="text-gray-500">{label}</div>
    </div>
  </div>
);


export default StudentView;
