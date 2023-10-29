import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { useAuth } from '../AuthContext';

function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useAuth();
    const [userType, setUserType] = useState("admin"); // valores: 'admin' o 'student'

    const API_BASE_URL = "https://localhost:7005/api/Usuarios";
    const navigate = useNavigate();  

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);

        const endpoint = userType === "admin" ? "/api/users/authenticate" :
        userType === "gestor" ? "/api/users/authenticate" :
         "/api/users/login-student";
        const payload = {
            Email: email,
            Password: password
        };

        try {
          console.log(userType)
            const response = await fetch(API_BASE_URL + endpoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log("Respuesta completa:", data);

            // Imprime el Rol que te está devolviendo el servidor.
            console.log("Rol del usuario:", data.user?.rol);
    

            if (response.status === 200) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data.user));
              localStorage.setItem("userID", data.user.idUsuario);

              setCurrentUser(data.user); 

              if (data.user.rol === 1) {
                navigate("/SanctionForm");  // Redirecciona al admin
            } else if (data.user.rol === 2) {
                navigate("/SanctionForm");  // Redirecciona al gestor
            } else if (data.user.rol === 3) {
                navigate("/FacultyForm");  // Redirecciona al estudiante
            } else {
                setErrors({ form: "Rol no reconocido." });
            }
            
            } else {
                setErrors({ form: data.message || "Error al iniciar sesión." });
            }
        } catch (error) {
            setErrors({ form: "Error al conectar con el servidor." });
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        let formErrors = {};

        if (!email) formErrors.email = "El email es obligatorio.";
        if (!password) formErrors.password = "La contraseña es obligatoria.";

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>

            {errors.form && <div className="error">{errors.form}</div>}

            <label>
                Tipo de Usuario:
                <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="admin">Administrador</option>
                    <option value="gestor">Gestor</option>
                    <option value="student">Estudiante</option>
                </select>
            </label>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}

            <button onClick={handleLogin} disabled={loading}>
                Iniciar sesión
            </button>
        </div>
    );
}

export default LoginComponent;


