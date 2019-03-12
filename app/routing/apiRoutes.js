//
// Project Friend Finder
// This full-stack site will take in results from your users' surveys,
// then compare their answers with those from other users. The app
// will then display the name and picture of the user with the best
// overall match.
//
// apiRoutes.js - Express routes for the applications api requests 

// Load the application data objects
var surveysData = require("../data/friends");

// Function to find the best survey match
var findMatch = (newSurvey) => {
  var currentDifference = 0;
  var newDifference = 0;
  var currentScores = [];
  var matchedSurvey = {};

  // Convert new surveys scores to integers
  var newScores = newSurvey.scores.map(Number);

  // Find best match
  surveysData.forEach(function(survey) {

    // Convert current survey scores to integers
    currentScores = survey.scores.map(Number);

    // Find the best survey match
    newDifference = 0;
    for (var i = 0; i < currentScores.length; i++) {
      newDifference += Math.abs(newScores[i] - currentScores[i]);
    }
    console.log("newDifference=" + newDifference + " currentDifference=" + currentDifference);
    if (currentDifference == 0 || newDifference < currentDifference) {
      matchedSurvey = survey;
      currentDifference = newDifference;
    }
  });

  // Return the best survey match
  return matchedSurvey;
}

// Export the the Express api routes
module.exports = function(app) {

  // Get all survey(s) route
  app.get("/api/friends", function(req, res) {

    // Return all survey(s
    res.json(surveysData);
  });
  
  // New survey route
  app.post("/api/friends", function(req, res) {
    var matchedSurvey = {};

    // Find best survey match
    matchedSurvey = findMatch(req.body);

    // Push new survey to the current list of surveys
    surveysData.push(req.body);

    // Return the best match
    res.json(matchedSurvey);
  });
};
