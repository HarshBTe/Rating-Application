import React, { useEffect, useState } from 'react';
import API from '../services/api';
import RatingForm from '../components/RatingForm';
import { useNavigate } from 'react-router-dom';
import '../styles/UserDashboard.css'; // Import external CSS file

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await API.get('/stores', { headers });
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="user-dashboard">
      <h2>Store Listings</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      {stores.length === 0 ? (
        <p className="no-stores">No stores available.</p>
      ) : (
        <div className="store-list">
          {stores.map((store) => (
            <div key={store.id} className="store-card">
              <h3 className="store-name">{store.name}</h3>
              <p className="store-address">Address: {store.address}</p>
              <p className="store-rating">
                Average Rating: <span>{store.averageRating ? store.averageRating.toFixed(1) : 'N/A'}</span>
              </p>
              <RatingForm storeId={store.id} userRating={store.userRating || 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
