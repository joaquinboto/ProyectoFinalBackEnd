const User = require("../models/userModel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (user) {
            return done(null, false, { message: 'User already exists' });
        }
        const newUser = await User.create({ username, password });
        return done(null, newUser);
    } catch (err) {
        return done(err);
    }
}
))

passport.use('login' , new LocalStrategy(
    {usernameField: 'username' , passwordField: 'password'},
   async (username, password, done) => {
    
        try {
            const user = await User.findOne({username});
            if(!user){
                return done(null, false, {message: "Incorrect username"});
            }
            const isMatch = await user.isValidPassword(password);
            if(!isMatch){
                return done(null, false, {message: "Incorrect password"});
            } else {
                return done(null, user, {message: "Logged in successfully"});
            }
        } catch (error) {
            console.log(error);
        }
    }
))


passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
    
})