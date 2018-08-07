var Campground  = require("../models/campground"), 
    express     = require("express"),
    router      = express.Router({mergeParams: true});


//INDEX
router.get("/", function (req, res) {
        Campground.find({}, function(err, campgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: campgrounds}); //thisis the source, the 2nd arg in callback function
            }
        });
});
//  CREATE
router.post("/", function(req, res){
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
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});
//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
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

module.exports = router;