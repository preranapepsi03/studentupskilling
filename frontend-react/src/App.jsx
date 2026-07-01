import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

// Changed to named export to match your main.jsx setup!
export function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' or 'signup'

  // Day 25: Check storage on mount to see if user is already authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    const storedToken = localStorage.getItem('authToken');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUser(null);
    setView('login');
  };

  if (user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>🎯 Your Task Dashboard</h1>
        <p>Logged in securely as: <strong>{user.username}</strong></p>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div>
      {view === 'login' ? (
        <Login switchToSignup={() => setView('signup')} onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />
      ) : (
        <Signup switchToLogin={() => setView('login')} />
      )}
    </div>
  );
}