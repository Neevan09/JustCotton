const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
      Collections = require('./models/collections'),
      Comment     = require('./models/comments'),
        User      = require('./models/users'),
      seedDB      = require('./seeds');

const url = "mongodb+srv://ns7767:FOOTball1722@justcottoncluster-1k4s5.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url || "mongodb://localhost/justcotton",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
seedDB();

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

//Index - Show all the collections.
app.get("/", (req, res) => {
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
app.get("/collections/new", (req, res) => {
   res.render("collections/new");
});

//Show the description of the new collections.
app.get("/collections/:id",(req, res) => {
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


//COMMENTS ROUTE
app.get("/collections/:id/comments/new", isLoggedIn, (req, res) => {

    const id = req.params.id;
    Collections.findById(id, (err, showComment) => {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {collection: showComment});
        }
    });
});

//POST COMMENTS
app.post("/collections/:id/comments", isLoggedIn, (req, res) => {
   const id = req.params.id;
   Collections.findById(id, (err, collections) => {
       if(err){
           console.log(err);
           res.redirect("/collections");
       }else {
            Comment.create(req.body.comment, (err, comment) =>{
                console.log(req.body.comment);
               if(err){
                   console.log(err);
               }else{
                   collections.comments.push(comment);
                   collections.save();
                   res.redirect("/collections/"+collections._id);
               }
           console.log("Comments:   "+req.body.comment);
            });
       }
   })
});

//AUTH ROUTES
app.get("/register",(req, res) => {
   res.render("register");
});


//Sign up logic
app.post("/register", (req,res) => {
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
app.get("/login", (req,res) => {
   res.render("login");
});

//handle login logic
app.post("/login",
    passport.authenticate("local",
        {
                successRedirect: "/",
                failureRedirect: "/login"}),(req, res) => {

});

//Logout route
app.get("/logout",(req, res)=>{
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

app.listen(process.env.PORT || 3000, () => {
    console.log("JustCotton server is started");
});
