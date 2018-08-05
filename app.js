var Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    request     = require("request"),
    seedDB      = require("./seeds"),    
    app         = express();    

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
//runs seedDB, to del out exisiting db and seed with sample data
seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");



// SCHEMA SETUP, will be refactored


// Campground.create(
//     {
        // name: "Island Lake", 
        // image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f2c971a1ecb2b8_340.jpg",
        // description: "Great hikes nearby"
        // name: "Patrick Creek", 
        // image: "https://farm6.staticflickr.com/5488/9884981675_e9573f7632.jpg",
        // description: "Jedidiah Smith, sunny "
        // name: "Salmon Creek", 
        // image: "https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104496f2c971a1ecb2b8_340.jpg",
        // description:"No clue but recommended by Colt"
        
    // }, function(err, campground){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("Newly created campground: ");
    //         console.log(campground);
    //     }
    // });

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});
// temp until have DB ---------
// var campgrounds = [
//   {name: "Salmon Creek", image: "https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104496f2c971a1ecb2b8_340.jpg"},
//   {name: "Island Lake", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f2c971a1ecb2b8_340.jpg"},
//   {name: "Patrick Creek", image: "https://farm6.staticflickr.com/5488/9884981675_e9573f7632.jpg"}
// ];
   // add in db to the get function. do better error handling later
//INDEX
app.get("/campgrounds", function (req, res) {
        Campground.find({}, function(err, campgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: campgrounds}); //thisis the source, the 2nd arg in callback function
            }
        });
});
//  CREATE
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description}; // matching previous format above
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});
// NEW
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       }  else {
           console.log(foundCampground);
            //render the show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// ++++++++++++++++++++++++++++++++++++++
// COMMENTS ROUTES
//+++++++++++++++++++++++++++++++++++++++
app.get("/campgrounds/:id/comments/new", function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req,res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp app has started!");
});