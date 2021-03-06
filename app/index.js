const fs = require('fs');
const Project = require('./models/project');
const Design = require('./models/design');
const File = require('./models/file');
const Viewer = require('./models/viewer');
const payload = require('../api/payload');
const { pickProps } = require('../utils');

const app = {
    viewers: () => {
        return Viewer.find();
    },

    breadcrumbs: async (current) => {
        const currentCrumb = { name: current.name };
        const ascendants = await current.ascendants();
        return [app.breadcrumbs.ROOT, ...payload(ascendants, 'projects'), currentCrumb];
    },

    createProject: async (attributes) => {
        return Project.create(attributes);
    },

    createDesign: async (attributes) => {
        return Design.create(attributes);
    },

    /**
     * Update a project document
     *
     * @param {String|ObjectId} _id - id of the project
     * @param {Object} attributes - attributes updates
     * @return {Promise} project model
     */
    updateProject: (_id, attributes) => {
        const updates = pickProps(attributes, 'name', 'viewers');
        return Project.findOneAndUpdate({ _id }, updates, { new: true });
    },

    renameDesign: async (_id, name) => {
        return Design.findOneAndUpdate({ _id }, { name }, { new: true });
    },

    createFiles: async ({ files, designId }) => {
        files = [].concat(files || []);
        const lastPosition = await app.lastDesignFilesPosition(designId);
        const filesAttrs = files.map((file, index) => {
            const position = file.position || (lastPosition + index + 1);
            return {
                position,
                design: designId,
                filename: file.filename
            };
        });
        return File.create(filesAttrs);
    },

    designFilesList: async (designId) => {
        return await File.find({ design: designId }).sort({ position: -1 });
    },

    removeFile: async (fileId) => {
        const removedFile = await File.findOneAndRemove({ _id: fileId });
        try {
            fs.unlinkSync(removedFile.filepath);
        } catch (err) {
            if (err.code !== 'ENOENT' || err.path !== removedFile.filepath) {
                throw err;
            }
        }
        return removedFile;
    },

    lastDesignFilesPosition: async (designId) => {
        const nolastPositionDefault = 0;
        const file = await File.findOne({ design: designId }).sort({ position: -1 }).lean();
        if (!file) {
            return nolastPositionDefault;
        }
        return file.position;
    },

    reorderFiles: async (designId) => {
        const files = await File.find({ design: designId })
            .sort({ position: 1 })
            .select('position');

        if (files.length > 0) {
            await Promise.all(files.map((file, index) => {
                file.position = index + 1;
                return file.save();
            }));

            return true;
        }

        return false;
    }
};

app.breadcrumbs.ROOT = { name: 'Projects', href: '/' };

module.exports = app;
