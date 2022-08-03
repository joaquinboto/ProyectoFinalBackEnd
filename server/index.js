const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server , {
    cors: {
        origin: 'http://localhost:3000'
    }
});

require('dotenv').config();
require('./passport/local-auth');

const FACTORYDAO = require('../server/dao/indexDAO');
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
app.use(cookieParser());
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




app.post("/register", passport.authenticate('signup') , (req, res , next) => {
    res.status(200).json({
        message: "User created",
        user: req.user
    })
    next()
  });

app.post("/login", async (req, res , next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err || !user) {
                console.log(err)
               return next(err)
            }

            req.login(user, {session: false} , async (err) => {
                if(err) {
                    return next(err)
                }
                const body = {
                    id: user._id,
                    username: user.username,
                }
                const token = jwt.sign({user: body}, process.env.SECRET_KEY, {
                    expiresIn: '30s'
                })
                res.cookie(String(user._id), token, {
                    maxAge: 3600000,
                    httpOnly: true,
                    path: '/',
                    sameSite: 'lax',
                })
                return res.status(200).json({token})
            })
            
        } catch (error) {
            return next(error)
        }
    })(req, res, next)
})

// verify token


app.get("/", async (req, res , next) => {
    const cookie = req.headers.cookie;
    const token = cookie.split('=')[1];

    if(!token) {
        return res.status(401).json({
            message: "Not authorized"
        })
    } 

    try {
        const decoded = jwt.verify(String(token), process.env.SECRET_KEY);
        const user = await dao.users.getById(decoded.user.id)
        return res.status(200).json({
            message: "User found",
            user
        })
    } 
    catch (error) {
        return next(error)
    }
})



// start server
server.listen(process.env.PORT || 3002, () => {
    console.log(`Server running on port ${PORT}`)
})





