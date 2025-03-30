const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('admin', 'user', 'owner'), allowNull: false },
});

module.exports = User;
