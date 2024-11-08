const express = require('express');
const app = express();
const expressapp = require('./app');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api', authRoutes);

// Start the server
expressapp.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


