const mongoose = require('mongoose');
const { ProjectSchema } = require('../schemas');

class Project extends mongoose.Model {

    /**
     * Return of project ascendants
     * @return {Array}
     *
     */
    async ascendants() {
        const breadcrumbsAggregate = await this.constructor.aggregate([
            { $match: { _id: this._id} },
            {
                $graphLookup: {
                    from: 'projects',
                    startWith: '$parent',
                    connectFromField: 'parent',
                    connectToField: '_id',
                    as: 'ancestors'
                }
            },
            { $project: { _id: 0, ancestors: 1 } }
        ]);

        if (breadcrumbsAggregate.length === 0) {
            return [];
        }

        return breadcrumbsAggregate[0].ancestors;
    }
}

const model = mongoose.model(Project, ProjectSchema);

module.exports = model;
