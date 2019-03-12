//
// Project Friend Finder
// This full-stack site will take in results from your users' surveys,
// then compare their answers with those from other users. The app
// will then display the name and picture of the user with the best
// overall match.
//
// htmlRoutes.js - Express routes for the applications html files 

// Load Path library
var path = require("path");

// Export the the Express html routes
module.exports = function(app) {

  // Home page route
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '../public/', "home.html"));
  });
  
  // Survey page route
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname + '../public/', "survey.html"));
  });
};
