//
// Project Friend Finder
// This full-stack site will take in results from your users' surveys,
// then compare their answers with those from other users. The app
// will then display the name and picture of the user with the best
// overall match.
//
// server.js - Entry point to the Friend Finder application 

// Load the application data objects
var surveysData = require("./app/data/friends");

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

// Constructor to create a new Friend object
var friend = function(name, photo) {
  this.name = name,
  this.photo = photo,
  this.scores = seedScores();
};

// Function to seed the scores
var seedScores = ()  => {
    var scores = new Array();
    for (var i = 0; i < 10; i++)
      scores[i] = getRandomNumber(1, 6).toString();
    return scores;   
};

// Function to get random numbers
function getRandomNumber(min, max) {
  var number = Math.floor(Math.random() * (max - min) + min);
  return number;
}

// Seed surveys
surveysData.push(new friend("Beldar", "http://images4.fanpop.com/image/photos/21400000/Beldar-positive-thinking-21405837-225-255.jpg"));
surveysData.push(new friend("Ryan Reynolds", "https://m.media-amazon.com/images/M/MV5BOTI3ODk1MTMyNV5BMl5BanBnXkFtZTcwNDEyNTE2Mg@@._V1_.jpg"));
surveysData.push(new friend("Jeff Bridges", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Jeff_Bridges_by_Gage_Skidmore_3.jpg/220px-Jeff_Bridges_by_Gage_Skidmore_3.jpg"));
surveysData.push(new friend("Clint Eastwood", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRADSKELvHiB6usHRpQPAr1UkG0nitfiy6DKcll1GZbn-LiZlkuFQ"));
surveysData.push(new friend("Kate Hudson", "https://m.media-amazon.com/images/M/MV5BMTA1NTk0MjMyOTFeQTJeQWpwZ15BbWU3MDA4NzEzMTM@._V1_UY209_CR8,0,140,209_AL_.jpg"));
surveysData.push(new friend("Jennifer Anistone", "https://m.media-amazon.com/images/M/MV5BNjk1MjIxNjUxNF5BMl5BanBnXkFtZTcwODk2NzM4Mg@@._V1_UY209_CR3,0,140,209_AL_.jpg"));
surveysData.push(new friend("Kate Beninsale", "http://trackingboard1.wpengine.netdna-cdn.com/wp-content/uploads/2015/05/Kate_Beckinsale_02.jpg"));
surveysData.push(new friend("Tom Araya", "https://static1.squarespace.com/static/55ccf522e4b0fc9c2b651a5d/55cd1a3de4b07043dba529da/55cd21e5e4b09e646ff116d2/1439507104102/TomAraya.jpg?format=500w"));
surveysData.push(new friend("Arron Rodgers", "data:image/jpeg;base64,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"));
surveysData.push(new friend("Halle Berry", "data:image/jpeg;base64,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"));
surveysData.push(new friend("Keith Emerson", "data:image/jpeg;base64,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"));
surveysData.push(new friend("Greg Lake", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzKHr4Kl36ka-WUSkQ9pDvA-Br20Bm0YQwv6HFVIqshtltWre"));
surveysData.push(new friend("Carl Palmer", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQgNLbj69c12HLbcUzEQv1ia7teM4Bvm6qM3ovQrHPz66l2iSH"));
surveysData.push(new friend("William Shatner", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwZKWJbR0VOMK-SxVPNGW2QsWjzdZ0ZBSO05CFQNgu2N9rJ3KMXA"));
surveysData.push(new friend("Cameron Diaz", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWp90n90mN0cW-Qs37XHz7fLJyQQuZyhOMNEFOeNQyxYrgpRFP"));
surveysData.push(new friend("Angelia Jolie", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lir2BXtDadNHPZ4U6zwysF_uoI97kbwWMOqqE_ceGkP9lorKlw"));
//console.log(JSON.stringify(surveysData, null, 2));

// Startup server
app.listen(PORT, function() {
  console.log("FriendFinder application listening on PORT " + PORT);
});
