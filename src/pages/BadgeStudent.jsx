import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const AssignBadgeForm = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [students, setStudents] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "https://localhost:7205/api"; // Asegúrate de usar la URL correcta de tu API

  // Cargar estudiantes
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/Students`)
      .then(response => {
        const studentOptions = response.data.map(s => ({
          value: s.idStudent,
          label: `${s.firstName} ${s.lastName}` // Concatenar nombre y apellido
        }));
        setStudents(studentOptions);
      })
      .catch(error => console.error('Error al cargar estudiantes:', error))
      .finally(() => setLoading(false));
  }, [API_BASE_URL]);

 // ...

// Cargar badges de nivel inicial
useEffect(() => {
  setLoading(true);
  axios.get(`${API_BASE_URL}/Badges`)
    .then(response => {
      // Incluir solo badges de nivel 'Inicial'
      const initialBadgeOptions = response.data
        .filter(b => b.badgeLevel.toLowerCase() === 'inicial') // Asumiendo que 'badgeLevel' es el campo correspondiente
        .map(b => ({
          value: b.idBadge,
          label: b.badgeName
        }));
      setBadges(initialBadgeOptions);
    })
    .catch(error => console.error('Error al cargar badges:', error))
    .finally(() => setLoading(false));
}, [API_BASE_URL]);

  const handleAssignBadge = async () => {
    if (!selectedStudent || !selectedBadge) {
      alert('Por favor, seleccione un estudiante y un badge.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/Badges/AssignInitialByName`, {
        StudentId: selectedStudent.value,
        BadgeName: selectedBadge.label
      });
      alert('Badge asignado con éxito al estudiante.');
      setSelectedStudent(null);
      setSelectedBadge(null);
    } catch (error) {
      console.error('Error al asignar el badge:', error);
      alert('Error al asignar el badge.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Asignar Badge a Estudiante</h2>
      <Select
        value={selectedStudent}
        onChange={setSelectedStudent}
        options={students}
        isLoading={loading}
        placeholder="Seleccione un estudiante..."
        isClearable
        isSearchable
        name="students"
      />
      <Select
        value={selectedBadge}
        onChange={setSelectedBadge}
        options={badges}
        isLoading={loading}
        placeholder="Seleccione un badge..."
        isClearable
        isSearchable
        name="badges"
      />
      <button onClick={handleAssignBadge} disabled={loading || !selectedStudent || !selectedBadge}>
        {loading ? 'Asignando...' : 'Asignar Badge'}
      </button>
    </div>
  );
};

export default AssignBadgeForm;
