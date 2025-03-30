const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./user');

const Store = db.define('Store', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  ownerId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: 'id' } },
});



User.hasMany(Store, { foreignKey: 'ownerId' });
Store.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = Store;

