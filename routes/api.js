// routes/api.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const userDataFile = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
    fs.readFile(userDataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading user data.' });
        const users = JSON.parse(data || '[]');
        res.json(users);
    });
});

router.put('/users/:username', (req, res) => {
    const { username } = req.params;
    const { password } = req.body;

    fs.readFile(userDataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading user data.' });

        const users = JSON.parse(data || '[]');
        const userIndex = users.findIndex(user => user.username === username);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found.' });
        }

        users[userIndex].password = password;

        fs.writeFile(userDataFile, JSON.stringify(users, null, 2), err => {
            if (err) return res.status(500).json({ message: 'Error updating user data.' });
            res.json({ message: 'User updated successfully.' });
        });
    });
});

router.delete('/users/:username', (req, res) => {
    const { username } = req.params;

    fs.readFile(userDataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading user data.' });

        let users = JSON.parse(data || '[]');
        users = users.filter(user => user.username !== username);

        fs.writeFile(userDataFile, JSON.stringify(users, null, 2), err => {
            if (err) return res.status(500).json({ message: 'Error deleting user.' });
            res.json({ message: 'User deleted successfully.' });
        });
    });
});

module.exports = router;
