const express = require('express');
const Project = require('../app/models/project');
const payload = require('./payload');

const router = express.Router();

router.get('/projects', async (req, res) => {
    const projects = await Project.find({ parent: null }).lean();
    res.json(payload(projects, 'projects'));
});

router.get('/project', async (req, res) => {
    const project = await Project.findOne({ _id: req.query.id }).lean();
    if (!project) {
        throw new Error('Project not found');
    }
    const breadcrumbsAggregate = await Project.aggregate([
        { $match: { _id: project._id } },
        {
            $graphLookup: {
                from: 'projects',
                startWith: '$parent',
                connectFromField: 'parent',
                connectToField: '_id',
                as: 'breadcrumbs'
            }
        },
        { $project: { _id: 0, breadcrumbs: 1 } }
    ]);
    let breadcrumbs = [];
    if (breadcrumbsAggregate.length) {
        breadcrumbs = [{ name: 'Projects', href: '/' }, ...payload(breadcrumbsAggregate[0].breadcrumbs, 'projects'), { name: project.name }];
    }
    const subProjects = await Project.find({ parent: project._id }, { name: 1 }).lean();
    res.json({
        project,
        breadcrumbs,
        subProjects: payload(subProjects, 'projects'),
        designs: []
    });
});

module.exports = router;
