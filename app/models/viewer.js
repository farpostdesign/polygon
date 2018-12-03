const mongoose = require('mongoose');
const { ViewerSchema } = require('../schemas');

const model = mongoose.model('Viewer', ViewerSchema);

module.exports = model;
