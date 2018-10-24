#CampReview
A review site for campgrounds using RESTful routing created in node.js
code-along: Colt Steele webdevbootcamp (YelpCamp)
NOTE: This is still a work in progress. I'm just putting it up for now to show what I've been up to.

##Initial Setup
* Landing Page
* Campgrounds page that lists all campgrounds
    -initially added as an array, will add in db later
    Each Campground has: --Name  --Image
    
#Layout and Basic Styling
* Created header and footer partials
* Using BS3 - will migrate to 4 at end

#Create a New Campground
* Setup new campground POST route
* Basic unstyled form
* Setup route to show form
* Add authorization

# Add in styling 
* Add better header/footer files
* Make campground display in a grid
* Add a navbar to templates
* Style the New Campground Form
* 
# Add MongooseDB
* Setup campground model
* Use model in routes
##Refactor Mongoose Code
 * Models dir / module.exports
## Add Seeds File to run every timer server starts

# Add the comment model
* Show nested comments on individual campground page
* CRUD routes and buttons
# Add authorization

# Add User model nvm
* Authentication - using passport
* Registration template and routes
* Login template and routes
* Add Administrator role

# Flash alert messages
* Add to user login /out
* errors

# Add dynamic price feature to campground

# Add time since post feature
* Using Moment JS

# Add fuzzy search feature
* Currently only for campground name

#Update to Bootstrap4
* Change thumbnails to cards
* Change wells to cards
* Change glyphicon to font awesome
* Still working a few bugs
* 
# Change password by email
* token good for an hour
* Update to node 6
* Add packages: async, nodemailer
* Add routes, reset and forgot views