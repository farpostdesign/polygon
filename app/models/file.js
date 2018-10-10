const mongoose = require('mongoose');
const { FileSchema } = require('../schemas');

const model = mongoose.model('File', FileSchema);

module.exports = model;
