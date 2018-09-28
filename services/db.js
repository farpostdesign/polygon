const mongoose = require('mongoose');
const config = require('../config');

const { Schema } = mongoose;

function errHandler(err) {
    throw new Error(err);
}

mongoose.connect(config.mongooseConnection).catch(errHandler);

module.exports.ProjectSchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.ObjectId, ref: 'Project' }
});

module.exports.DesignSchema = new Schema({
    name: { type: String, required: true },
    project: { type: Schema.ObjectId, ref: 'Project', required: true }
});

module.exports.FileSchema = new Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    design: { type: Schema.ObjectId, ref: 'Design', required: true }
});
