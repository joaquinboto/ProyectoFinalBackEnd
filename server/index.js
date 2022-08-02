const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require("cors");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server , {
    cors: {
        origin: 'http://localhost:3000'
    }
});

require('dotenv').config();
require('./passport/local-auth');

const FACTORYDAO = require('../server/dao/indexDAO')
const dao = FACTORYDAO()
const PORT = process.env.PORT || 3002


// middleware
app.set('port', PORT);
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: ['key1'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Chat ///////////////////////////////////////////////////////////////////////
io.on('connection', (socket) => {
   socket.on('message', async (data) => {


   })   
})

// connect to mongoDB //////////////////////////////////////////////////////////
mongoose.connect("mongodb://localhost:27017/users", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.catch(err => console.log(err));




// routes


app.get("/login", (req, res) => {
    res.send("ok")
})

app.get('register', (req, res) => {
    res.send("ok")
})

app.post("/register", passport.authenticate('signup') , (req, res , next) => {
    if(req.user) {
        res.send("ok")
    } else {
        res.send("error")
    }
    next()
  });

app.post("/login", passport.authenticate('login') , (req, res , next) => {
    if(req.user) {
        res.send("ok")
    } else {
        res.status(401).send("error")
    }

    next()
})





// start server
server.listen(process.env.PORT || 3002, () => {
    console.log(`Server running on port ${PORT}`)
})





