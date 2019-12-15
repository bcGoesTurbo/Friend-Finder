// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//creates express server and sets up a port
var app = express();
var PORT = process.env.PORT || 8080;

// Static files
// needs to be called before the routes in order to work
app.use(express.static(path.join(__dirname, './app/public')));

//Body Parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// Start listening on PORT
app.listen(PORT, function() {
  console.log('Friend Finder app is listening on PORT: ' + PORT);
});

