import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImage from '../images/Univalle_bol_cbb_logo.png'; 

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
        localStorage.setItem("userEmail", data.user.email);

        setCurrentUser(data.user);
        console.log("User email on load:", localStorage.getItem("userEmail"));

        if (data.user.rol === 1) {
          navigate("/"); // Redirecciona al admin
        } else if (data.user.rol === 2) {
          navigate("/DashboardGestor"); // Redirecciona al gestor
        } else if (data.user.rol === 3) {
          navigate("/DashboardStudent"); // Redirecciona al estudiante
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
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
           src={LogoImage}
            alt="logo"
          />
          Univalle
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form class="space-y-4 md:space-y-6">
              {errors.form && <div className="error mb-4">{errors.form}</div>}

              <div className="">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tipo de Usuario:
                </label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                label="Email address"
                size="lg"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="error">{errors.email}</div>}
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                label="Password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                size="lg"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}

              <button
                onClick={handleLogin}
                className={`bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white p-2 mb-4 w-full font-medium rounded-lg  transition duration-200 transform hover:scale-105 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>

              {errors.form && (
                <div className="text-red-500 text-center mt-2">
                  {errors.form}
                </div>
              )}

              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/ForgotPassword"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginComponent;
