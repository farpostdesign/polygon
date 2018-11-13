const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports.ProjectSchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.ObjectId, ref: 'Project' }
}, { timestamps: true });

module.exports.DesignSchema = new Schema({
    name: { type: String, required: true },
    project: { type: Schema.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

module.exports.FileSchema = new Schema({
    filename: { type: String, required: true },
    position: { type: Number, required: true, min: 0 },
    design: { type: Schema.ObjectId, ref: 'Design', required: true }
}, { timestamps: true });
