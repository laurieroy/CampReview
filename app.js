var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});
<!-- temp until have DB -->
var campgrounds = [
   {name: "Salmon Creek", image: "https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104496f2c971a1ecb2b8_340.jpg"},
   {name: "Island Lake", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f2c971a1ecb2b8_340.jpg"},
   {name: "Patrick Creek", image: "https://farm6.staticflickr.com/5488/9884981675_e9573f7632.jpg"}
];
   
app.get("/campgrounds", function (req, res) {

       res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image} // matching previous format above
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp app has started!");
});