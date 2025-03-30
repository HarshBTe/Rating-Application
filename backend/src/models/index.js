const db = require('../config/db');
const User = require('./user');
const Store = require('./store');
const Rating = require('./rating');


module.exports = { db, User, Store, Rating };