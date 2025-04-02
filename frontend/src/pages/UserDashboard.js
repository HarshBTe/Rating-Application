import React, { useEffect, useState } from 'react';
import API from '../services/api';
import RatingForm from '../components/RatingForm';
import { useNavigate } from 'react-router-dom';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleUpdatePassword = ()=> {
    navigate('/update-password');
  }
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-dashboard">
            <div className='two-button-container'>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="update-password-button" onClick={handleUpdatePassword}>Update Password</button>
      </div>
      <h2>Store Listings</h2>

      <input 
        type="text" 
        placeholder="Search by name or address..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-input"
      />
      
      {filteredStores.length === 0 ? (
        <p className="no-stores">No stores available.</p>
      ) : (
        <div className="store-list">
          {filteredStores.map((store) => (
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
