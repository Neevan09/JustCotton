const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');


//AUTH ROUTES
router.get("/register",(req, res) => {
    res.render("register");
});


//Sign up logic
router.post("/register", (req,res) => {
    const newUser = new User({username: req.body.username});
    const password = req.body.password;
    User.register(newUser,password,(err, user) => {
        if(err){
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req, res, function (){
            res.redirect("/");
            console.log("New user login success");
        });
    });
});


//SHow Login form
router.get("/login", (req,res) => {
    res.render("login");
});

//handle login logic
router.post("/login",
    passport.authenticate("local",
        {
            successRedirect: "/",
            failureRedirect: "/login"}),(req, res) => {

    });

//Logout route
router.get("/logout",(req, res)=>{
    req.logout();
    res.redirect("/");
});

//Middleware to check the user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
