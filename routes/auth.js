const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const authProfileRoutes = require('../controllers/profileController');
const router = express.Router();
const app = express();
app.use(express.json());

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/register', registerUser);

router.post('/login', loginUser)

module.exports = router;
