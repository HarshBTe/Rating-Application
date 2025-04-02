import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/UsersList.css"; // Import CSS

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [token]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="users-container">
      <h1 className="users-title">Users List</h1>
      <input
        type="text"
        placeholder="Search by Name, Email, Address, or Role"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td className={user.role === "admin" ? "role-admin" : "role-user"}>
                {user.role}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
