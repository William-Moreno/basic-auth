'use strict';

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



module.exports = {
  app: app,
  start: function(port) {
    app.listen(port, () => {
      console.log(`App is up and running on PORT :: ${port}`);
    });
  },
};