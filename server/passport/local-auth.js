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
    { usernameField: 'username',
     passwordField: 'password' },
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (user) {
                return done(null, false, { message: 'User already exists' });
            }

            let pass = password.toString();
            
            const newUser = new User({
                username,
                password: await bcrypt.hash(pass, 10)
            });
            await newUser.save();
            return done(null, newUser); 
        } catch (error) {
            console.log(error);
        }
    }
))

passport.use('login', new LocalStrategy(
    { usernameField: 'username',
    passwordField: 'password', },
    async (username, password, done) => {
       try {
              const user = await User.findOne({username})
              if(!user) {
                console.log('User not found')
                return done(null, false)
              }
              let pass = password.toString();
              const isMatch = await bcrypt.compare(pass, user.password)
              if(!isMatch) {
                console.log('Password is incorrect')
                return done(null, false)
              }
              return done(null, user)
        
       } catch (error) {
              return done(error)
       }
    }
))