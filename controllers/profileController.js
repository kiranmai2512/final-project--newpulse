const express = require('express');
const User = require('../models/userModel');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
const app = express();
app.use(express.json());

router.get('/profile/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile.' });
    }
});

router.put('/profile/:id', verifyToken, async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            address,
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user profile.' });
    }
});

router.delete('/profile/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'User profile deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user profile.' });
    }
});

module.exports = router;
