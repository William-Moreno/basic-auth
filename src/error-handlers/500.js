'use strict';

module.exports = function(err, request, response, next) {

  const error = err.message ? err.message : err;
  response.status(500).send(error);
};