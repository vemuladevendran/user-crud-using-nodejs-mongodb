'user strict'

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     name: {type: String, require: true},
     email: {type: String},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;