import React, { useState } from 'react';

function ResetPassword() {
  const [token, setToken] = useState(''); // Suponiendo que el token lo obtienes de la URL o de alguna manera
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
        const response = await fetch(`https://localhost:5173/api/Usuarios/reset-password`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: token, newPassword: password }) // Incluye el token aquí, dentro del cuerpo del mensaje
});

      if (response.ok) {
        setMessage('Password has been reset successfully.');
      } else {
        const data = await response.json();
        setMessage(data.message || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
