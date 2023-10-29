import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; 
import Select from 'react-select';

function SanctionForm() {
    const [idStudent, setIdStudent] = useState("");
    const [sanctionDescription, setSanctionDescription] = useState("");
    const [sanctionValue, setSanctionValue] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth(); 
    const [students, setStudents] = useState([]);

    const API_BASE_URL = "https://localhost:7005/api/Sanctions";

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("https://localhost:7005/api/Sanctions/GetAllStudents");
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error("Error al cargar los estudiantes:", error);
            }
        };

        fetchStudents();
    })

    const studentOptions = students.map(s => ({
        value: s.idStudent,
        label: s.fullName
    }));

    const handleCreateSanction = async () => {
        if (!idStudent || !sanctionDescription || !sanctionValue) {
            console.log("Campos:", idStudent, sanctionDescription, sanctionValue);
            setErrors({ form: "Todos los campos son requeridos" });
            return;
        }
    
        setLoading(true);
        
        const userIDFromLocalStorage = parseInt(localStorage.getItem("userID"), 10);


        if (isNaN(userIDFromLocalStorage) || userIDFromLocalStorage <= 0) {
            console.error("El ID del gestor o administrador no es válido.");
            setErrors({ form: "Por favor, inicie sesión de nuevo." });
            return;
        }
        
        
        const payload = {
            IdStudent: idStudent,
            SanctionDescription: sanctionDescription,
            SanctionValue: parseInt(sanctionValue, 10),
            ResponsibleGestorId: currentUser?.id || userIDFromLocalStorage 
        };
        
    
        console.log("Datos enviados al servidor:", payload);
    
        try {
            const response = await fetch(API_BASE_URL + "/CreateSanction", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
    
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
    
            if (response.status === 200) {
               
                alert("Sanción creada exitosamente!");
            } else {
                setErrors({ form: data.message || "Error al crear la sanción." });
            }
        } catch (error) {
            setErrors({ form: "Error al conectar con el servidor." });
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h2>Crear Sanción</h2>

            {errors.form && <div className="error">{errors.form}</div>}
            <label>
                Estudiante:
                <Select
                    options={studentOptions}
                    onChange={selectedOption => setIdStudent(selectedOption.value)}

                    placeholder="Escribe y selecciona un estudiante..."
                />
            </label>

            <label>
                Descripción de la Sanción:
                <textarea
                    value={sanctionDescription}
                    onChange={e => setSanctionDescription(e.target.value)}
                ></textarea>
            </label>

            <label>
                Valor de la Sanción:
                <input
                    type="number"
                    value={sanctionValue}
                    onChange={e => setSanctionValue(e.target.value)}
                />
            </label>

            <button onClick={handleCreateSanction} disabled={loading}>
                Crear Sanción
            </button>
        </div>
    );
}

export default SanctionForm;

