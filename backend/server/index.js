const express = require('express');
const authRoutes = require('./routes/auth');
const optionsRoutes = require('./routes/userOptions/options');
const error = require('./controllers/errorController');
const app = express();
const ports = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();

});

app.use('/options', optionsRoutes);
app.use('/auth', authRoutes);
app.use(error.get404);
app.use(error.get500);

app.listen(ports, () => console.log(`port is in ${ports}`));