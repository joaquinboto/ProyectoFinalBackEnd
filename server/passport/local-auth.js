const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})

passport.use('signup', new LocalStrategy(
    { passReqToCallback: true,
        sucessRedirect: '/login',
        failureRedirect: '/register' },
    (req, username, password, done) => {
        User.findOne({username}, (err, user) => {
            if(err) return done(err)
            if (user) {
                console.log('User already exists')
                return done(null, false)
            }
            const hassPassword = bcrypt.hashSync(password, 10)
            const newUser = { username, password: hassPassword , name: req.body.name }
            User.create(newUser, (err, userWithID) => {
                if(err) return done(err)

                console.log("User created" , userWithID)
                return done(null, userWithID)
            })

        })

    }
))

passport.use('login', new LocalStrategy(
    { passReqToCallback: true ,
    sucessRedirect: '/',
    failureRedirect: '/register'},
    (req, username, password, done) => {
        User.findOne({username}, (err, user) => {
            if(err) return done(err)
            if (!user) {
                console.log('User not found')
                return done(null, false)
            }

            const isValidPassword = bcrypt.compareSync(password, user.password)
            if (!isValidPassword) {
                console.log('Invalid password')
                return done(null, false)
            } else {
                console.log('User logged in')
                return done(null, user)
            }

        })
    }
))