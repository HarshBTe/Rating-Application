import React, { useState } from "react";
import API from "../services/api";
import "../styles/CreateUser.css"; // Import CSS

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user", // Default role
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await API.post("/auth/signup", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", response);
      setMessage(response.data.message);
      setUserData({ name: "", email: "", password: "", address: "", role: "user" });
    } catch (error) {
      setMessage("Error adding user. Try again.");
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={userData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={userData.address} onChange={handleChange} required />
        <select name="role" value={userData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default CreateUser;


