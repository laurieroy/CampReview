var Campground  = require("../models/campground"), 
    express     = require("express"),
    router      = express.Router({mergeParams: true}); //test removing hte mergeparams


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
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }   ;
    var newCampground = {name: name, image: image, description: description, author: author}; // matching previous format above

    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});
// NEW
router.get("/new", isLoggedIn, function(req, res) {
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

//EDIT campground route
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
       res.render("campgrounds/edit", {campground: foundCampground});
   });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundOwnership, function(req, res){
    // FIND AND UPDATE THE CORRECT CAMPGROUND
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
// DESTROY ROUTE
router.delete("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// MIDDLEWARE
function checkCampgroundOwnership(req, res, next){
      if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
               //Does the user own the campground?
               if(foundCampground.author.id.equals(req.user._id)){
                    next();
               } else {
                   res.redirect("back");
               }
            }
        });
    } else {
        res.redirect("back");
    }
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;