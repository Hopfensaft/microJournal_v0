var express = require("express"),
    app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    JournalEntry = require("./models/journalentry"),
    User = require("./models/user");
    
var journalentryRoutes = require("./routes/journalentries"),
    indexRoutes = require("./routes/index");

//Passport configuration
app.use(require("express-session")({
   secret: "Too fat to fly!",
   resave: false,
   saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

//DB configuration
var url = process.env.DATABSAEURL || "mongodb://localhost/microjournal"
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
// seedDB(); ssed the database

app.use(indexRoutes);
app.use("/journalentries", journalentryRoutes);
//app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("MicroJournal has started"); 
});