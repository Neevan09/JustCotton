const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      Collections = require('./models/collections'),
      seedDB      = require('./seeds');

seedDB();

const url = "mongodb+srv://ns7767:FOOTball1722@justcottoncluster-1k4s5.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url || "mongodb://localhost/justcotton",
{
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


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
    //let newCollection = {name:name, image:image, description:description};

    const newCollections = new Collections({
        name: name,
        image: image,
        description: description
    });
    console.log("newCollections:    "+ newCollections);
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
app.get("/collections/new", (req, res) => {
   res.render("new");
});

//Show the description of the new collections.
app.get("/collections/:id",(req, res) => {
    let id = req.params.id;

    Collections.findById(id).populate("comments").exec((err, showCollection) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("showCollection:    "+showCollection);
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


