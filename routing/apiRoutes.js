var surveysData = require("../data/friends");

// Export the the Express api routes
module.exports = function(app) {

  // Get survey(s) route
  app.get("/api/friends", function(req, res) {
    res.json(surveys);
  });
  
  // New survey route
  app.post("/api/friends", function(req, res) {
    var newSurvey = req.body;
    console.log(newSurvey);
    surveysData.push(newSurvey);
    res.json(newSurvey);
  });
};
