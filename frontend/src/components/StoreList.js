import React, { useEffect, useState } from 'react';
import API from '../services/api';

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await API.get('/stores');
        setStores(data);
      } catch (error) {
        console.error('Error fetching stores', error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div>
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>{store.name} - Rating: {store.averageRating}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
