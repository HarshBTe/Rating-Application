import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css'; // Import external CSS file
import Dashboard from '../components/Dashboard';


const AdminDashboard = () => {
  const [stores, setStores] = useState([]);
  const [storeData, setStoreData] = useState({ name: '', address: '', ownerId: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await API.get('/stores');
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleCreateStore = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/stores', storeData);
      fetchStores();
      setStoreData({ name: '', address: '', ownerId: '' });
    } catch (error) {
      console.error('Error creating store:', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleViewUsers = () => {
    
    navigate('/viewusers');
  };

  const handleCreateUsers = () => {
    
    navigate('/createusers');
  };



  return (
    <div>
     <button className="logout-button" onClick={handleLogout}>Logout</button>
    <Dashboard />
    <div className='two-buttons'>
    
    <button className="viewusers-button" onClick={handleViewUsers}>View Users</button>
    <button className="createusers-button" onClick={handleCreateUsers}>Create Users</button>
    </div>

    <div className="admin-container">
      
      <h2>Manage Stores</h2>
       
      <form className="store-form" onSubmit={handleCreateStore}>
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={storeData.name}
          onChange={handleChange}
          required
          className="store-input"
        />
        <input
          type="text"
          name="address"
          placeholder="Store Address"
          value={storeData.address}
          onChange={handleChange}
          required
          className="store-input"
        />
        <input
          type="text"
          name="ownerId"
          placeholder="Owner ID"
          value={storeData.ownerId}
          onChange={handleChange}
          required
          className="store-input"
        />
        <button type="submit" className="store-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Store'}
        </button>
      </form>

      <h3>All Stores</h3>
      <ul className="store-list">
        {stores.map((store) => (
          <li key={store.id} className="store-item">
            {store.name} - {store.address} (Owner: {store.ownerId})
          </li>
        ))}
      </ul>
    </div>
    </div>
    
  );
};

export default AdminDashboard;
