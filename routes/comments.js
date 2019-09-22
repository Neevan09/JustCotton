const express = require('express');
const router = express.Router({mergeParams: true});
const Collections = require('../models/collections');
const Comment = require('../models/comments');

//New comments
router.get("/new", isLoggedIn, (req, res) => {

    const id = req.params.id;
    Collections.findById(id, (err, showComment) => {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {collection: showComment});
        }
    });
});

//Create a new comments
router.post("/", isLoggedIn, (req, res) => {
    const id = req.params.id;
    Collections.findById(id, (err, collections) => {
        if(err){
            console.log(err);
            res.redirect("/collections");
        }else {
            Comment.create(req.body.comment, (err, comment) =>{
                //console.log(req.body.comment);
                if(err){
                    console.log(err);
                }else{
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     comment.save();

                    collections.comments.push(comment);
                    collections.save();

                    console.log(req.user.text);
                    res.redirect("/collections/"+collections._id);
                }
            });
        }
    })
});

//Middleware to check the user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
