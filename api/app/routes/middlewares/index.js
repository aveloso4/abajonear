module.exports = function(router){

	 var jwt = require('jsonwebtoken');

	function checkToken(req, res, next) {

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		// decode token
		  if (token) {

		    // verifies secret and checks exp
		    jwt.verify(token, 'abajonear-token', function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes
		        req.decoded = decoded;   
		        next();
		      }
		    });

		  } else {

		    // if there is no token
		    // return an error
		    return res.status(403).send({ 
		        success: false, 
		        message: 'No token provided.' 
		    });
		    
		  }

	} 

	function needsToken(req, res, next) {

		if ((req.url === '/auth' || req.url === '/auth/create') && req.method ==='POST') {
			console.log('not auth required: ' + req.url);
			next();
		} else {
			checkToken(req, res, next);
		}
	}


	router.use(needsToken);

};