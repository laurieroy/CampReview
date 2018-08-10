var passportLocalMongoose   = require("passport-local-mongoose"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    methodOverride          = require("method-override"),
    LocalStrategy           = require("passport-local"),
    flash                   = require("connect-flash"), 
    User                    = require("./models/user"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    express                 = require("express"),
    request                 = require("request"),
    seedDB                  = require("./seeds"),  

    app                     = express();    
// REQUIRING ROUTES
var campgroundRoutes        = require("./routes/campgrounds"),
    commentRoutes           = require("./routes/comments"),
    indexRoutes             = require("./routes/index");
        
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//runs seedDB, to del out exisiting db and seed with sample data
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"This might be my last week of pay with NOAA!",
    resave: false,
    saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user; 
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp app has started!");
});