// StudentPortfolioView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentPortfolioView = () => {
  const [studentInfo, setStudentInfo] = useState(null);
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

    axios.get(`https://localhost:7205/api/Students/${studentId}`)
      .then(response => {
        setStudentInfo(response.data);
      })
      .catch(err => {
        setError('Error fetching student information: ' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!studentInfo) return <div className="text-center p-4">No student information available.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <img src={studentInfo.imagePath} alt="Student" className="w-32 h-32 rounded-full" />
        <h1 className="text-4xl font-extrabold text-gray-800 my-4">{studentInfo.firstName} {studentInfo.lastName}</h1>
        <p className="text-xl text-gray-600">{studentInfo.rankName} | {studentInfo.subRankName}</p>
        <div className="text-gray-600">{studentInfo.score} Experience Points</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Aquí irían componentes o divs para mostrar información adicional del estudiante como habilidades, cursos, etc. */}
        {/* Ejemplo: */}
        <InfoSection title="Skills" items={studentInfo.skills} />
        <InfoSection title="Courses" items={studentInfo.courses} />
        <InfoSection title="Projects" items={studentInfo.projects} />
        {/* Continúa agregando secciones según sea necesario */}
      </div>
    </div>
  );
};

const InfoSection = ({ title, items }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h2 className="text-lg font-bold text-gray-800 border-b pb-2">{title}</h2>
    <ul className="mt-2">
      {items && items.map((item, index) => (
        <li key={index} className="text-gray-600 py-1">{item}</li>
      ))}
    </ul>
  </div>
);

export default StudentPortfolioView;
