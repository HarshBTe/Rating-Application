import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../styles/Register.css';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let errors = {};
    
    if (form.name.length < 20 || form.name.length > 60) {
      errors.name = 'Name must be between 20 and 60 characters.';
      valid = false;
    }
    if (form.address.length > 400) {
      errors.address = 'Address cannot exceed 400 characters.';
      valid = false;
    }
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(form.password)) {
      errors.password = 'Password must be 8-16 characters and include at least one uppercase letter and one special character.';
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email format.';
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
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
          className="signup-input"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="signup-input"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="signup-input"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="signup-input"
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <select onChange={(e) => setForm({ ...form, role: e.target.value })} className="signup-select">
          <option value="user">User</option>
          <option value="owner">Store Owner</option>
          <option value="admin">Admin</option>
        </select>
        
        <button type="submit" className="signup-button">Signup</button>

        <p className="login-text">
          Already registered? <span onClick={() => navigate('/')}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
