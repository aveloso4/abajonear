module.exports = function(router) {
  var User = require('../models/user').model;

 
  router.get('/users', function(req, res) {
    
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }

      res.json(users);
    });

  });

  router.get('/users/me', function(req, res) {
    console.log(User.current._id);
    User.findById(User.current._id, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });

/**
 * @api {get} /users/:userId Read data of a User
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 *
 * @apiParam {String} id The Users-ID.
 *
 * @apiExample Example usage:
 * curl -i http://abajonear-api.herokuapp.com/users/AABBCCDFDF
 *
 * @apiSuccess {String}   _id           The Users-ID.
 * @apiSuccess {String}   email         Email of the user.
 * @apiSuccess {String}   first_name    First name of the User.
 * @apiSuccess {String}   last_name     Last name of the User.
 * @apiSuccess {String}   user_type     Role of the User.
 * @apiSuccess {Object[]} addressess    List of Users address (Array of Objects).
 * @apiSuccess {ObjectId} _company      The company Id which user belongs to.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
router.get('/users/:userId', function(req, res) {
    User.findById(req.params.userId, function(err, user) {
      if (err)
          res.send(err);
      res.json(user);
    });
      
  });

  /**
   * @api {post} /users Create a new User
   * @apiVersion 0.1.0
   * @apiName PostUser
   * @apiGroup User
   * @apiPermission admin
   *
   * @apiDescription In this case "apiUse" is defined and used.
   * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
   *
   * @apiParam {String} email Email of the User.
   * @apiParam {String} password Password of the User.
   * @apiParam {String} first_name First Name of the User.
   * @apiParam {String} last_name Last Name of the User.
   * @apiParam {String} user_type Role of the User.
   *
   * @apiSuccess {String} id         The new Users-ID.
   *
   *
   */
  router.post('/users', function(req, res) {
    var user      = new User();
    user.email    = req.body.email;
    user.password = req.body.password;
    user.first_name = req.body.first_name;
    user.last_name  = req.body.last_name;
    user.user_type  = req.body.user_type; 

    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({
          success: true, 
          message: 'hooray! the user has been created succesfully'
        });
    });
  });

  /**
   * @api {put} /users/:userId Update an User
   * @apiVersion 0.1.0
   * @apiName PutUser
   * @apiGroup User
   * @apiPermission none
   *
   * @apiDescription This function has same errors like POST /users.
   *
   * @apiParam {String} email Email of the User.
   * @apiParam {String} password Password of the User.
   * @apiParam {String} first_name First Name of the User.
   * @apiParam {String} last_name Last Name of the User.
   * @apiParam {String} user_type Role of the User.
   *
   */
  router.put('/users/:userId', function(req, res) {
    User.findById(req.params.userId, function(err, user) {
      if (err)
          res.send(err);  
      
      user.email    = req.body.email;
      user.password = req.body.password;
      user.first_name = req.body.first_name;
      user.last_name  = req.body.last_name;
      user.user_type  = req.body.user_type; 

      user.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'hooray! user updated succesfully!' });
      }); //save
    }); //findById
  }); //put

  /**
   * @api {delete} /users/:userId Delete an User
   * @apiVersion 0.1.0
   * @apiName deleteUser
   * @apiGroup User
   * @apiPermission admin
   
   * @apiParam {String} userId User-ID.
   * @apiSuccess {String} userId The User-ID of the deleted User.
   *
   *
   */
  router.delete('/users/:userId', function(req, res) {
    
    User.remove({
      _id: req.params.userId
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json({ message: 'hooray! user:' + req.params.userId + ' deleted succesfully' });
    }); //remove
  }); // delete

};