import React, { useState } from 'react';
import API from '../services/api';
import '../styles/RatingForm.css'; // Import external CSS file

const RatingForm = ({ storeId, userRating }) => {
  const [rating, setRating] = useState(userRating || 1);

  const submitRating = async (e) => {
    e.preventDefault();
    try {
      await API.post('/ratings', { storeId, rating: Number(rating) });
      alert('Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <form className="rating-form" onSubmit={submitRating}>
      <label className="rating-label">Rate this store:</label>
      <select className="rating-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <button className="rating-submit" type="submit">Submit</button>
    </form>
  );
};

export default RatingForm;
