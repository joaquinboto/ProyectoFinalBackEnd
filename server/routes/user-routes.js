const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


// routes
router.get('/', (req, res) => {
    res.send('Hello World');
})

router.post("/register", passport.authenticate('signup' , {session: false}) , async (req, res) => {
    res.send("User registered");
})

router.post("/login", async (req, res , next) => {
   passport.authenticate('login', async (err, user, info) => {
    try {
        if(err || !user) {
            res.status(400).json({
                message: "Something is not right",
            })
            return next(err)
        }
        req.login(user, {session: false}, async (err) => {
            if(err) {
                res.send(err);
            }
            const body = {_id: user._id, username: user.username};
            const token = jwt.sign({user: body}, 'secret');
            return res.json({user, token});
        })

    } catch (error) {
        return next(error);
    }
   })(req, res, next);
})



module.exports = router;