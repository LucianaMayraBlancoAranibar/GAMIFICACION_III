
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WelcomeBanner() {
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
  return (
    <div className="relative bg-gray-200 dark:bg-gray-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Background illustration */}
      <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
        <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
            <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
            <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
              <stop stopColor="#292828" offset="0%" />
              <stop stopColor="#4f5054" offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
              <stop stopColor="#820717" offset="0%" />
              <stop stopColor="#5c052f" stopOpacity="0" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="rotate(64 36.592 105.604)">
              <mask id="welcome-d" fill="#fff">
                <use xlinkHref="#welcome-a" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
              <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
            </g>
            <g transform="rotate(-51 91.324 -105.372)">
              <mask id="welcome-f" fill="#fff">
                <use xlinkHref="#welcome-e" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
              <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
            </g>
            <g transform="rotate(44 61.546 392.623)">
              <mask id="welcome-h" fill="#fff">
                <use xlinkHref="#welcome-g" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
              <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
            </g>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Bienvenido de nuevo,  {studentRank.firstName} {studentRank.lastName}!</h1>
        <p className="dark:text-indigo-200">Univalle</p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
