// components/ProtectedRoute.js

import { Route, Redirect } from "react-router-dom";


function isAuthenticated() {
    // Aquí se verifica si el usuario está autenticado.
    // Podría ser verificando un token en el localStorage, una variable global, etc.
    return !!localStorage.getItem('authToken'); // solo un ejemplo
}