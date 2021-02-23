'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const express = require('express');
const router = express.Router();

const UserModel = require('../models/user-model.js');
const basicAuth = require('../middleware/basic-auth.js');


router.post('/signup', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let encryptedPassword = await bcrypt.hash(password, 5);
  const newUser = new UserModel({ username: username, password: encryptedPassword });
  const document = await newUser.save();
  res.status(201).json(document);
});

router.post('/signin', basicAuth, (req, res) => {
  res.status(200).json(req.body);
});


module.exports = router;
