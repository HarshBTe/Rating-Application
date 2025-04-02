import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './pages/AdminDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import UserDashboard from './pages/UserDashboard';
import UsersList from './components/UsersList';
import CreateUser from './components/CreateUser';
import UpdatePassword from './components/UpdatePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/owner" element={<StoreOwnerDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/viewusers" element={<UsersList />} />
        <Route path="/createusers" element={<CreateUser />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        
      </Routes>
    </Router>
  );
}

export default App;
