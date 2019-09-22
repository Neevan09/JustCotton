const express = require('express');
const router = express.Router();
const Collections = require('../models/collections');

//Index - Show all the collections.
router.get("/", (req, res) => {
    req.user;
    Collections.find((err, allCollections) => {
        if(err){
            console.log("Something went wrong");
        } else {
            res.render("collections/index", {collections:allCollections, currentUser: req.user});
        }
    });
});

//Create - add new collections to the database.
router.post("/",(req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    //let newCollection = {name:name, image:image, description:description};

    const newCollections = new Collections({
        name: name,
        image: image,
        description: description
    });
    //console.log("newCollections:    "+ newCollections);
    newCollections
        .save()
        .then((result) => {
            //console.log("result:    "+ result);
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
});

//New - show form to create the collections.
router.get("/collections/new", (req, res) => {
    res.render("collections/new");
});

//Show the description of the new collections.
router.get("/collections/:id",(req, res) => {
    let id = req.params.id;

    Collections.findById(id).populate("comments").exec((err, showCollection) => {
        if(err){
            console.log(err);
        }else {
            //console.log("showCollection:    "+showCollection);
            res.render("collections/show", {collection: showCollection});
        }
    });
});


module.exports = router;
