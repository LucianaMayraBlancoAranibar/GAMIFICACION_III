import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import { useAuth } from "../AuthContext";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();
  const [userType, setUserType] = useState("admin");

  const API_BASE_URL = "https://localhost:7205/api/Usuarios";
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const endpoint =
      userType === "admin"
        ? "/api/users/authenticate"
        : userType === "gestor"
        ? "/api/users/authenticate"
        : "/api/users/login-student";
    const payload = {
      Email: email,
      Password: password,
    };

    try {
      console.log(userType);
      const response = await fetch(API_BASE_URL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Respuesta completa:", data);

      console.log("Rol del usuario:", data.user?.rol);

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userID", data.user.idUsuario);

        setCurrentUser(data.user);

        if (data.user.rol === 1) {
          navigate("/"); // Redirecciona al admin
        } else if (data.user.rol === 2) {
          navigate("/"); // Redirecciona al gestor
        } else if (data.user.rol === 3) {
          navigate("/StudentRankView"); // Redirecciona al estudiante
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
    <div className="flex flex-wrap h-screen">
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-10 space-y-6">
        <div className="flex items-center mb-2 mt-10">
          <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
            Gamificación
          </span>
        </div>
        <h3 className="text-xl mb-4 font-normal tracking-wider text-center">
          Log in
        </h3>
        <div className="w-full sm:w-2/3 md:w-1/2">
          {errors.form && <div className="error mb-4">{errors.form}</div>}

          <div className="">
            <label className="block mb-2 text-sm font-bold">
              Tipo de Usuario:
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="block appearance-none w-full bg-white border mb-4 p-2 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-100 text-gray-700 py-2 px-4 pr-8 leading-tight focus:bg-white focus:border-blue-500"
            >
              <option value="admin">Administrador</option>
              <option value="gestor">Gestor</option>
              <option value="student">Estudiante</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <input
            type="email"
            label="Email address"
            size="lg"
            className="border mb-4 p-2 w-full rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-100"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <input
            type="password"
            label="Password"
            className="border mb-4 p-2 w-full rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-100"
            size="lg"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}

          <button
            onClick={handleLogin}
            className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-2 mb-4 w-full rounded-full shadow-md transition duration-200 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          {errors.form && <div className="text-red-500 text-center mt-2">{errors.form}</div>}

          <p className="text-xs mb-5 text-gray-500">
            <a
              href="/ForgotPassword"
              className="hover:text-blue-500 transition duration-200"
            >
              Forgot password?
            </a>
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div className="hidden sm:block w-1/2">
        <img
          src={
            "https://scontent.cdninstagram.com/v/t39.30808-6/396718286_764683899031947_8277713279431758848_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjgweDEyODAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=9s9TydjlUfsAX9qHdGZ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzIyMzU1ODEwMjc5OTMyNTIzNg%3D%3D.2-ccb7-5&oh=00_AfB1bo9-_wJjP8srAKBf30psbUN55H7eiqowCRPOLd1vXw&oe=6546AB1E&_nc_sid=10d13b"
          }
          alt="Login image"
          className="w-full h-screen object-cover object-left"
        />
      </div>
    </div>
  );
}

export default LoginComponent;
