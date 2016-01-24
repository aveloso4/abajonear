// BASE SETUP
// =============================================================================

// call the packages we need

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

var port = process.env.PORT || 8080;

app.set('superSecret', 'KM2HKW6CNA');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();
require('./app/routes')(router);

app.use('/docs', express.static(__dirname + '/docs'));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Abajonear API running on port ' + port);