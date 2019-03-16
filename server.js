//
// Project Friend Finder
// This full-stack site will take in results from your users' surveys,
// then compare their answers with those from other users. The app
// will then display the name and picture of the user with the best
// overall match.
//
// server.js - Entry point to the Friend Finder application 

//
//  Heroku Deployment URL
//
//  https://secret-brook-27994.herokuapp.com/
//

// Load the application data objects
var friendsData = require("./app/data/friends");

// Load Express library
var express = require("express");

// Set port to listen on
var PORT = process.env.PORT || 3000;

// Create Express object
var app = express();

// Setup Express middleware for data parsing etc.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Express routing
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Seed surveys
friendsData.seedSurveyData();
//console.log(JSON.stringify(friendsData.surveysData, null, 2));

// Startup server
app.listen(PORT, function() {
  console.log("FriendFinder application listening on PORT " + PORT);
});
