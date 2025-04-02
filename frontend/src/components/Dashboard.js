import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css"; // Import external CSS file

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  useEffect(() => {
    API.get("/admin/stats", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setStats(response.data))
    .catch(error => console.error("Error fetching stats:", error));
  }, [token]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2 className="stat-title">Total Users</h2>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">Total Stores</h2>
          <p className="stat-number">{stats.totalStores}</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">Total Ratings</h2>
          <p className="stat-number">{stats.totalRatings}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
