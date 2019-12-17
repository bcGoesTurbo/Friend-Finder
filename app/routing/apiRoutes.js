// address dependencies
var path = require('path');

// import friends list
var friends = require('../data/friends.js');

// export api routes
module.exports = function(app){
    //List of friends entry
    app.get('/app/friends.js', function(req, res)
    {
        res.json(friends);
    });

    // add new friend entry
    app.post('./app/friends.js', function(req, res)
    {
        // capture user input object
        var userInput = req.body;

        var userResponses = userInput.scrores;

        // best friend match
        var matchName = '';
        var matchImage = '';
        var totalDifference = 10000;

        // check all friends in the list
        for(var i = 0; i < friends.length;i++)
        {
            // differences for each question
            var diff = 0;
            for(var j = 0;j < userResponses.length;j++)
            {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }

            // if lowest difference, record the friend match
            if(diff < totalDifference)
            {
                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // add new user
        friends.push(userInput);

        res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    });
};
