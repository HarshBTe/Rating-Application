const Store = require('../models/store');
const User = require('../models/user');





exports.createStore = async (req, res) => {
  try {
    const { name, address, ownerId } = req.body;

    // Validate input
    if (!name || !address || !ownerId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if owner exists and is a store owner
    const owner = await User.findByPk(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    if (owner.role !== 'owner') {
      return res.status(403).json({ message: 'Only users with role "owner" can own a store' });
    }

    // Create store
    const store = await Store.create({ name, address, ownerId });

    res.status(201).json({ message: 'Store created successfully', store });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
