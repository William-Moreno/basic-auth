'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const UserModel = require('../models/user-model');

module.exports = async function(req, res, next) {

  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');
  
  let userFromDB = await UserModel.findOne({ username: username });
  if(userFromDB === null) {
    next('Invalid Login');
  }
  let isValid = await bcrypt.compare(password, userFromDB.password);
  if(isValid) {
    req.body.user = userFromDB;
    next();
  } else {
    next('Invalid Login');
  }
};