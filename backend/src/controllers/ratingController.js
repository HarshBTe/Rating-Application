const Rating = require('../models/rating');

const  Store  = require('../models/store');
const User = require('../models/user');


// Get Store Ratings (Store Owner Only)
exports.getStoreRatings = async (req, res) => {
  try {
    // Ensure the authenticated user is a store owner
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Access denied. Only store owners can view ratings.' });
    }

    const storeOwnerId = req.user.id;

    // Find the store owned by the authenticated user
    const store = await Store.findOne({ where: { ownerId: storeOwnerId } });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Fetch ratings associated with the store
    const ratings = await Rating.findAll({ 
      where: { storeId: store.id },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    res.json({ store: store.name, ratings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    await Rating.create({ userId: req.user.id, storeId, rating });
    res.status(201).json({ message: 'Rating submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



