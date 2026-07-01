import React, { useState } from 'react';

export default function Login({ switchToSignup, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Day 25: Securely persist the issued JWT token into browser local storage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));

      // Notify application state
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Welcome Back 👋</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Log In
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Don't have an account? <button onClick={switchToSignup} style={{ background: 'none', border: 'none', color: '#007BFF', cursor: 'pointer', textDecoration: 'underline' }}>Sign up here</button>
      </p>
    </div>
  );
}