import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../styles/Register.css'; // Import external CSS file

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      navigate('/');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
          className="signup-input"
        />
        <select onChange={(e) => setForm({ ...form, role: e.target.value })} className="signup-select">
          <option value="user">User</option>
          <option value="owner">Store Owner</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="signup-button">Signup</button>

        {/* Login redirect text */}
        <p className="login-text">
          Already registered? <span onClick={() => navigate('/')}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
