import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('https://localhost:7205/api/Usuarios/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agregar aquí otros encabezados si es necesario
        },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        // Si la solicitud fue exitosa, manejar la respuesta aquí
        setMessage('Please check your email to reset your password.');
    } else {
        // Si el servidor devuelve un código de estado de error
        const errorData = await response.json();
        setMessage(errorData.detail || 'An unexpected error occurred. Please try again later.');
        setIsError(true);
      }
    } catch (error) {
      // Errores de red o problemas inesperados
      setMessage('Network error. Please try again later.');
      setIsError(true);
    }
  };

  return (
    <div>
      <h2 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white" >Forgot Password</h2>
      <p className={isError ? 'error-message' : 'success-message'}>{message}</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ForgotPassword;

