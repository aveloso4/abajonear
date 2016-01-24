var _ = require('lodash');

function getResponse(success, body) {
  var response = {
    success: success
  };

  _.assign(response, body);

  return response;
}

module.exports = {
  getError: function(body) {
    return getResponse(false, body);
  },
  getSuccess: function(body) {
    return getResponse(true, body);
  }
};