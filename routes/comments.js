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
    Collections.findById(id, (err, newCollection) => {
        if(err){
            console.log(err);
            res.redirect("/collections");
        }else {
            // console.log("Comment:   "+req.body.comment);
            Comment.create(req.body.comment, (err, comment) =>{

                if(err){
                    console.log(err);
                }else{
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     comment.save();

                    newCollection.comments.push(comment);
                    newCollection.save();

               // console.log("Comments:  "+newCollection.comments);
                 //   console.log("-----------------------Author---------------------");

                    console.log("comment"+comment);
                    res.redirect("/collections/"+newCollection._id);
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
