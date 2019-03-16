//
// Project Friend Finder
// This full-stack site will take in results from your users' surveys,
// then compare their answers with those from other users. The app
// will then display the name and picture of the user with the best
// overall match.
//
// apiRoutes.js - Express routes for the applications api requests 

// Load the application data objects
var friendsData = require("../data/friends");

// Function to check for duplicate name
var isDuplicateName = (newSurvey) => {
  var value = friendsData.surveysData.find(function(survey) {
    return (newSurvey.name === survey.name);
  });
  return value;
}

// Function to find the best survey match
var findMatch = (newSurvey) => {
  var currentDifference = 0;
  var newDifference = 0;
  var currentScores = [];
  var matchedSurvey = {};

  // Get the desired gender
  var desiredGender = newSurvey.desiredGender;
  if (desiredGender === "4")
    desiredGender = Math.floor(Math.random() * (4 - 1) + 1).toString();

  // Create array of friends based on gender
  var genderArray = friendsData.surveysData.filter(function(survey) {
    // Don't match on identical names...
    if (survey.name !== newSurvey.name)
      if (survey.gender === desiredGender) return survey;
  });

  // Convert new friends survey scores to integers
  var newScores = newSurvey.scores.map(Number);

  // Find best match
  genderArray.forEach(function(survey) {

    // Convert array items survey scores to integers
    currentScores = survey.scores.map(Number);

    // Compute the differences between the surveys
    newDifference = 0;
    for (var i = 0; i < currentScores.length; i++) {
      newDifference += Math.abs(newScores[i] - currentScores[i]);
    }
    //console.log("newDifference=" + newDifference + " currentDifference=" + currentDifference);
    
    // Find the best survey match
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
    res.json(friendsData.surveysData);
  });
  
  // New survey route
  app.post("/api/friends", function(req, res) {
    var matchedSurvey = {};

    // Find best survey match
    matchedSurvey = findMatch(req.body);

    // Check for duplicate name before pushing new friend to current list
    if (isDuplicateName(req.body) == null)
    friendsData.surveysData.push(req.body);

    // Return the best match
    res.json(matchedSurvey);
  });
};
