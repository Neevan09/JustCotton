const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose');

const url = "mongodb+srv://ns7767:FOOTball1722@justcottoncluster-1k4s5.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url || "mongodb://localhost/justcotton",
{
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//SCHEMA SETUP - Adding new images.
let collectionsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Collections = mongoose.model("Collections", collectionsSchema);

module.exports = Collections;

// Collections.create(
//     {
//         name: "Men",
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJhE-tk8T6oOONZDh0sHA3v6Uov7SaZyC1Pe5ODci6kTOuMx6Pw",
//         description: "This Zip-Up Hoodie with adjustable drawstring lets you lock in the warmth around your head, Sleeve Cuffs and Waistband help keep you warm, Kanga Pockets keep your hands warm and the inner pocket let you store valuables in this Hooded Sweatshirt"
//     },(err, collection) => {
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("Newly created collections");
//             console.log(collection);
//         }
//     }
// );
//

//Index - Show all the collections.
app.get("/", (req, res) => {

    Collections.find((err, allCollections) => {
        if(err)
        {
            console.log("Something went wrong");
        }
        else
        {
            res.render("index", {collections:allCollections});
        }
    });
});

//Create - add new collections to the database.
app.post("/",(req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCollection = {name:name, image:image, description:description};

    const newCollections = new Collections({
        name: name,
        image: image,
        description: description
    });

    newCollections
        .save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    //Create a new collection and save to DB
    Collections.create(newCollection, (err, newlyCreated) => {
        if(err){
            console.log(err);
        }
        else {
            res.redirect("/");
            console.log(newlyCreated);
        }
    });
});

//New - show form to create the collections.
app.get("/collections/new", (req, res) => {
   res.render("new");
});
//Show the description of the new collections.
app.get("/collections/:id",(req, res) => {
    let id = req.params.id;

    Collections.findById(id,(err, showCollection) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("show", {collection: showCollection});
        }
    });

    // Collections.findById(id,showCollection)
    //     .exec()
    //     .then(doc => {
    //         console.log(doc);
    //         res.render("show", {collection: showCollection});
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
});

app.listen(process.env.PORT || 3000, () => {
    console.log("JustCotton server is started");
});


