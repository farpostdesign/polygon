const mongoose = require('mongoose');
const { DesignSchema } = require('../../services/db');

const model = mongoose.model('Design', DesignSchema);

module.exports = model;
