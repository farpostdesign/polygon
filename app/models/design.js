const mongoose = require('mongoose');
const { DesignSchema } = require('../schemas');
const Project = require('./project');

class Design extends mongoose.Model {

    /**
     * List of design ascendants
     *
     */
    async ascendants() {
        const project = await Project.findOne({ _id: this.project });
        const projectAscendants  = await project.ascendants();
        return [...projectAscendants, project.toObject()];
    }
}

const model = mongoose.model(Design, DesignSchema);

module.exports = model;
