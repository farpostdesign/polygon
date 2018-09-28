const mongoose = require('mongoose');
const { FileSchema } = require('../../services/db');

const model = mongoose.model('File', FileSchema);

module.exports = model;
