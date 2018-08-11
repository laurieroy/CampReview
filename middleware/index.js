var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
    
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found")
                res.redirect("back");
            } else {
               //Does the user own the campground?
               if(foundCampground.author.id.equals(req.user._id)){
                    next();
               } else {
                    req.flash("error", "You don't have permission to do that.")
                    res.redirect("back");
               }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
               //Does the user own the campground?
               if(foundComment.author.id.equals(req.user._id)){
                    next();
               } else {
                   req.flash("error", "You don't have permission to do that!")
                   res.redirect("back");
               }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must login to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;