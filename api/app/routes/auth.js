module.exports = function (router) {
  var User = require('../models/user').model,
    jwt = require('jsonwebtoken'),
    responseSvc = require('../services/responseService'),
    errorCodes = require('../constants/errorCodes.js'),

    //TODO: expose secrets in a config file
    accessTokenSecret = 'abajonear-token',
    refreshTokenSecret = 'abajonear-refresh';

  function generateTokens(user) {
    // if user is not defined, tokens are not generated
    var result;

    if (user) {
      result = {
        access_token: jwt.sign(user, accessTokenSecret, {
          expiresIn: 1440 //expires in 24 hours
        }),
        refresh_token: jwt.sign(user, refreshTokenSecret, {
          expiresIn: 1440 //expires in 24 hours
        })
      };
    }

    return result;
  }

 /**
   * @api {post} /auth Get a new token
   * @apiVersion 0.1.0
   * @apiName GetToken
   * @apiGroup Auth
   * @apiPermission none
   *
   * @apiDescription In order to use the api you will need to authenticate to submit a JSWT on each request.
   *
   * @apiParam {String} email Email of the User.
   * @apiParam {String} password Password of the User.
   *
   *
   * @apiSuccess {Bool} success     The auth was succesfully.
   * @apiSuccess {String[]} tokens  Returns two tokens, access_token and refresh_token.
   *
   *
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "tokens": {
   *         "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjU5NTZiYjI1MjBiNGJkMDI1ZGMwMmQiLCJlbWFpbCI6Im5kdXF1ZUBkb2RhYmxlLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFlXMGtRTW82bFdxNC9wZVhIY3BEMU8zWEJRbTdXbDM1NXdrNGN4TlBjMXdmWmlYRDVpRloyIiwiZGlzcGxheV9uYW1lIjoidW5kZWZpbmVkIHVuZGVmaW5lZCIsIl9fdiI6MCwiYWRkcmVzc2VzIjpbXSwidXNlcl90eXBlIjoidXNlciJ9.sfyDmCWoh_x58jSt3YLlMw8mDLvXV2CMk8rjUcb-O-E",
   *         "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjU5NTZiYjI1MjBiNGJkMDI1ZGMwMmQiLCJlbWFpbCI6Im5kdXF1ZUBkb2RhYmxlLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFlXMGtRTW82bFdxNC9wZVhIY3BEMU8zWEJRbTdXbDM1NXdrNGN4TlBjMXdmWmlYRDVpRloyIiwiZGlzcGxheV9uYW1lIjoidW5kZWZpbmVkIHVuZGVmaW5lZCIsIl9fdiI6MCwiYWRkcmVzc2VzIjpbXSwidXNlcl90eXBlIjoidXNlciJ9.DyXtwx0gY5Lxxix5Pp5jUSj9qhs40FhOQ4QffluKRYU"
   *      }    
   *    }
   *
   *
   * @apiError UserNotFound The email of the User was not found.
   *
   * @apiErrorExample Error-Response: UserNotFound
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   *
   *
   * @apiError AuthenticationFailed The password did not match
   *
   * @apiErrorExample Error-Response: AuthenticationFailed
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "error": "AuthenticationFailed"
   *     }
   *
   */
  router.post('/auth', function (req, res) {
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw(err);

      if (!user) { 
        res.statusCode = 404;
        res.json(responseSvc.getError(errorCodes.auth.failed));
        return;

      } else if (user) {
        user.comparePassword(req.body.password)
          .then(function (match) {  
            if (match) {
              User.current = user;
              res.json(responseSvc.getSuccess({
                tokens: generateTokens(user)
              }));
            } else {
              res.statusCode = 404;
              res.json(responseSvc.getError(errorCodes.auth.failed));
            }
          }, function (err) {
            if (err) throw err;
          });
      }
    });
  });

  // Create user
  router.post('/auth/create', function (req, res) {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName
    });

    // Create address for the new user
    /*newUser.addresses.push({
      line1: req.body.adLine1,
      line2: req.body.adLine2,
      city:  req.body.adCity,
      state: req.body.adState,
      zip: req.body.adZip,
      country: req.body.adCountry
    });*/

    newUser.save(function (err, user) {
      console.log('saving user err:' + err);
      var result = err ? responseSvc.getError(errorCodes.auth.create) : responseSvc.getSuccess({
        tokens: generateTokens(user)
      });
      User.current = user;
      res.json({
        success: !err,
        message: err && err.errmsg,
        tokens: generateTokens(user)
      });
    });
  });
};

