'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async () => console.log(this));

// encrypt(userSchema.password, 5).then(hash => {
//   bcrypt.compare(userSchema.password, hash);
// });

// async function encrypt(stringToEncrypt, complexity) {

//   let hashed = await bcrypt.hash(stringToEncrypt, complexity);
//   return hashed;
// }

const userModel = mongoose.model('api_user', userSchema);

module.exports = userModel;