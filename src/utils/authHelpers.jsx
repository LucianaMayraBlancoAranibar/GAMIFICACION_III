
export function isAuthenticated() {
    return !!localStorage.getItem('token');
  }
  
  export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Aquí también podrías navegar el usuario al inicio o al inicio de sesión
  }
  