const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/justcotton");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//SCHEMA SETUP

let collectionsSchema = new mongoose.Schema({
    name:String,
        image: String
});


let Collections = mongoose.model("Collections", collectionsSchema);

Collections.create(
    {
        name: "Salmon Greek",
        image:"https://cdn.pixabay.com/photo/2019/08/08/13/52/elephant-4393034__340.jpg"
    },(err, collection) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Newly created collections");
            console.log(collection);
        }
    }
);

app.get("/", (req, res) => {
   res.render("landing");
});

let collections = [
    {name: "Men", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoecTctlgaOBnK6RjU0WaMQLrGqC6HzAqMZjcBvkut97HYt3r1ZwKK4t9h"},
    {name: "Women ", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzZhQrC9BsiitwWhhZmuJItSjT7_nI1_NCncds7nxA0waaAFw5"},
    {name: "Kids", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJhE-tk8T6oOONZDh0sHA3v6Uov7SaZyC1Pe5ODci6kTOuMx6Pw"},
];

app.get("/collections", (req, res) => {
    res.render("collections", {collections:collections});
});

app.post("/collections",(req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newCollection = {name:name, image:image};
    collections.push(newCollection);

    res.redirect("/collections");
});

app.get("/collections/new", (req, res) => {
   res.render("new.ejs");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("JustCotton server is started");
});


