const Project = require('./models/project');
const Design = require('./models/design');
const File = require('./models/file');
const payload = require('../api/payload');

const app = {
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

    renameProject: async (_id, name) => {
        return Project.findOneAndUpdate({ _id }, { name }, { new: true });
    },

    renameDesign: async (_id, name) => {
        return Design.findOneAndUpdate({ _id }, { name }, { new: true });
    },

    createFile: async ({ design, ext }) => {
        return File.create({ design, ext });
    },

    designFilesList: async (designId) => {
        return await File.find({ design: designId }).sort({ createdAt: -1 });
    },

    removeFile: async (query) => {
        return File.findOneAndRemove(query);
    }
};

app.breadcrumbs.ROOT = { name: 'Projects', href: '/' };

module.exports = app;
