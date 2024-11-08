const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    console.log('Registration request body:', req.body);

    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, phone, address });

        await newUser.save();
        console.log('User registered:', newUser);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user.' });
    }
};

const loginUser = async (req, res) => {
    console.log('Login request body:', req.body);

    const { loginemail, loginpassword } = req.body;
    if (!loginemail || !loginpassword) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email: loginemail });

        if (!user) {
            console.log(`User with email ${loginemail} not found.`);
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isPasswordMatch = await bcrypt.compare(loginpassword, user.password);
        console.log(`Password match result for ${loginemail}:`, isPasswordMatch);

        if (isPasswordMatch) {
            console.log('User authenticated:', user.name);
            res.render('success', { username: user.name });
        } else {
            console.log('Incorrect password for:', loginemail);
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login.' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
