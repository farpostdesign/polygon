const path = require('path');
const mongoose = require('mongoose');
const { FileSchema } = require('../schemas');
const config = require('../../config');

FileSchema.virtual('src').get(function fileGetSrc() {
    return path.join(config.uploadsDir, this.design.toString(), this.filename);
});

FileSchema.virtual('href').get(function fileGetHref() {
    return `/design?id=${this.design}#${this.id}`;
});

FileSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('File', FileSchema);

module.exports = model;
