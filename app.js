const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
      Collections = require('./models/collections'),
      Comment     = require('./models/comments'),
        User      = require('./models/users'),
      seedDB      = require('./seeds'),
 collectionRoutes = require('./routes/collections'),
    commentRoutes = require('./routes/comments'),
       authRoutes = require('./routes/auth');

mongoose.connect("mongodb://localhost/justcotton",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
seedDB(); //seed the database

//Passport Configuration
app.use(require("express-session")({
    secret: "Once again",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   next();
});

app.use(collectionRoutes);
app.use("/collections/:id/comments",commentRoutes);
app.use(authRoutes);


app.get("/Mens", (req,res) => {
   res.render("collections/mens");
});

app.get("/Womens", (req,res) => {
    res.render("collections/womens");
});

app.get("/Kids", (req,res) => {
    res.render("collections/kids");
});

app.get("/Homefurnishings", (req,res) => {
    res.render("collections/homefurnishings");
});

app.get("/Benefits", (req,res) => {
    res.render("collections/benefits");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("JustCotton server is started");
});
