'use strict';

const express = require('express');
const app = express();

const error404 = require('./error-handlers/404.js');
const error401 = require('./error-handlers/401.js');
const authRouter = require('./auth/routes/authentication.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);

app.use('*', error404);
app.use(error401);

module.exports = {
  app: app,
  start: function(port) {
    app.listen(port, () => {
      console.log(`App is up and running on PORT :: ${port}`);
    });
  },
};