const mongoose = require('mongoose');
const { UserSchema } = require('../schemas');

const model = mongoose.model('User', UserSchema);

module.exports = model;
