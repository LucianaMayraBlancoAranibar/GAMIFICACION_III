import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentRankView = () => {
  const [studentRank, setStudentRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const studentId = localStorage.getItem("userID");

    if (!studentId) {
      setError("No student ID found");
      setLoading(false);
      navigate("/login"); // Redirige al usuario si no hay ID de estudiante
      return;
    }

    const fetchStudentRank = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7205/api/Students/${studentId}/GetStudentRank`
        );
        setStudentRank(response.data);
      } catch (err) {
        setError("Error fetching student rank data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentRank();
  }, [navigate]); // Asegúrate de pasar navigate como dependencia si su valor puede cambiar

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 text-center">
          <img src={studentRank?.imagePath} alt="Rank" className="mx-auto" />
          <h2 className="text-2xl font-semibold my-2">
            Welcome, {studentRank?.firstName} {studentRank?.lastName}
          </h2>
          <p className="text-gray-700">
            Here is your current rank based on your points:
          </p>
          <div className="text-3xl font-bold">{studentRank?.rankName}</div>
          <div className="text-md text-gray-600">
            {studentRank?.subRankName}
          </div>
          <div className="text-xl">{studentRank?.score} points</div>
        </div>
      </div>
    </div>
  );
};

export default StudentRankView;
