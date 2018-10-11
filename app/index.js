const Project = require('./models/project');
const Design = require('./models/design');
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
    }
};

app.breadcrumbs.ROOT = { name: 'Projects', href: '/' };

module.exports = app;
