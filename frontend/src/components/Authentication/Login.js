// Login.js

import React, { useState } from 'react';
import authService from '../../services/authService';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: formData.username,
        password: formData.password
      };
      await authService.login(userData);
      // Redirect to dashboard or perform other actions upon successful login
      setIsLoggedIn(true);
      
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/tasks" />;
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
