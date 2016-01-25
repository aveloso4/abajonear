 module.exports = function(router) {
  var jwt = require('jsonwebtoken');
  // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
  });

  // middleware to use for all requests
  router.use(function(req, res, next) {
    // do logging
    console.log('-------Req Url-------------');
    console.log(req.url);
    console.log('---------------------------');
    console.log('-------Req Headers---------');
    console.log(req.headers);    
    console.log('-------Req Body------------');
    console.log(req.body);
    next();  // make sure we go to the next routes and don't stop here
  });

  // Add other routes files
  require('./middlewares')(router);
  require('./users')(router);
  require('./auth')(router);
  require('./companies')(router);
};