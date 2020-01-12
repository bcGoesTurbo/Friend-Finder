// address dependencies
var path = require('path');

// import friends list
var friends = require('../data/friends.js');

// export api routes
module.exports = function(app){
    //List of friends entry
    app.get('/api/friends', function(req, res)
    {
        res.json(friends);
    });

    // add new friend entry
    app.post('/api/friends', function(req, res)
    {
        var bestMatch = {
          name: "",
          photo: "",
          friendDifference: 1000  
        };

        console.log(req.body);

        var userData = req.body;
        var userScores = userData.scores;

        console.log("UserScores" + userScores);

        var totalDifference = 0;

        for(var i = 0; i < friends.length;i++)
        {
            console.log("Friends: " + friends[i]);
            totalDifference = 0;

            for(var j = 0; j < friends[i].scores[j];j++){
                
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if (totalDifference <= bestMatch.friendDifference){
                    
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = friends[i].friendDifference;

                }
            }
        }
        // add new user
        friends.push(userData);

        res.json(bestMatch);
    });
};

