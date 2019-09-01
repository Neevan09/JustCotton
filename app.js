const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/justcotton");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//SCHEMA SETUP

let campgroundSchema = new mongoose.Schema({
    name:String,
        image: String
});


let Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Salmon Greek",
        image:"https://cdn.pixabay.com/photo/2019/08/08/13/52/elephant-4393034__340.jpg"
    },(err, campground) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Newly created campgrounds");
            console.log(campground);
        }
    }
);

app.get("/", (req, res) => {
   res.render("landing");
});

let campgrounds = [
    {name: "Men", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoecTctlgaOBnK6RjU0WaMQLrGqC6HzAqMZjcBvkut97HYt3r1ZwKK4t9h"},
    {name: "Women ", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzZhQrC9BsiitwWhhZmuJItSjT7_nI1_NCncds7nxA0waaAFw5"},
    {name: "Kids", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJhE-tk8T6oOONZDh0sHA3v6Uov7SaZyC1Pe5ODci6kTOuMx6Pw"},
];

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds",(req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name:name, image:image};
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
   res.render("new.ejs");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("JustCotton server is started");
});


