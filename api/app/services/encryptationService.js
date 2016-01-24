var bcrypt = require('bcrypt'),
    q = require('q'),
    SALT_WORK_FACTOR = 10;

function encrypt(value) {
  var defer = q.defer();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {

    if (err) {
      defer.reject(err);
    } else {

      // hash the password along with our new salt
      bcrypt.hash(value, salt, function (err, hash) {

        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(hash);
        }
      });
    }
  });

  return defer.promise;
}

function compare(value1, value2) {
  var defer = q.defer();

  bcrypt.compare(value1, value2, function (err, match) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(match);
    }
  });

  return defer.promise;
}

module.exports = {
  encrypt: encrypt,
  compare: compare
};