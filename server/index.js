const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
require('./auth/user-controllers');


mongoose.connect("mongodb://localhost:27017/users" , (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB');
    }
})

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    
}));
app.use('/api', require('../server/routes/user-routes'));
app.use(session({
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost:27017/users',
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser());








// start server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})





