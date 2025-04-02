import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/StoreOwnerDashboard.css'; // Import external CSS file



const StoreOwnerDashboard = () => {
  const [storeName, setStoreName] = useState('');
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const { data } = await API.get('/ratings', { headers });

        setStoreName(data.store);
        setRatings(data.ratings || []);
      } catch (error) {
        console.error('Error fetching ratings', error);
      }
    };

    fetchRatings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleUpdatePassword = ()=> {
    navigate('/update-password');
  }

  return (
    <div className="owner-dashboard">
                  <div className='two-button-container'>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="update-password-button" onClick={handleUpdatePassword}>Update Password</button>
      </div>
      <h1>Store Owner Dashboard</h1>

      
      <h2 className="store-name">{storeName}</h2>

      {ratings.length === 0 ? (
        <p className="no-ratings">No ratings available.</p>
      ) : (
        <ul className="ratings-list">
          {ratings.map((rating) => (
            <li key={rating.id} className="rating-item">
              <span className="user-name">
                {rating.User ? rating.User.name : 'Anonymous'}
              </span> 
              - <span className="rating-stars">{rating.rating} stars</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
