
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/api', apiRoutes); 

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

module.exports = app;
