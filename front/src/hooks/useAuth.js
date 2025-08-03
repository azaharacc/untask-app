import { useState, useEffect } from 'react';
const BACK_URL = import.meta.env.VITE_TASKS_BACK;

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async () => {
    try {
      // local deployment:
      // const res = await fetch('http://localhost:3001/auth/login');
      // online
      const res = await fetch(`${BACK_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      if (data.token) {
        setToken(data.token);
      } else {
        throw new Error('No token returned');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken('');
  };

  return {
    token,
    isAuthenticated: !!token,
    email,
    password,
    setEmail,
    setPassword,
    login,
    logout,
  };
}

export default useAuth;
