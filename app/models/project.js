const mongoose = require('mongoose');
const { ProjectSchema } = require('../../services/db');

const model = mongoose.model('Project', ProjectSchema);

module.exports = model;
