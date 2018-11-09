const express = require('express');
const Project = require('../app/models/project');
const Design = require('../app/models/design');
const File = require('../app/models/file');
const app = require('../app');
const payload = require('./payload');
const config = require('../config');

const router = express.Router();
const asyncRoute = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

router.get('/projects', asyncRoute(async (req, res) => {
    const projects = await Project.find({ parent: null }).lean();
    res.json(payload(projects, 'projects'));
}));

router.get('/project', asyncRoute(async (req, res) => {
    const project = await Project.findOne({ _id: req.query.id });
    if (!project) {
        throw new Error('Project not found');
    }
    const breadcrumbs = await app.breadcrumbs(project);
    const subProjects = await Project.find({ parent: project._id }, { name: 1 }).lean();
    const designs = await Design.find({ project: project._id }).lean();
    res.json({
        project,
        breadcrumbs,
        subProjects: payload(subProjects, 'projects'),
        designs: payload(designs, 'design')
    });
}));

router.post('/projects', asyncRoute(async (req, res) => {
    const project = await app.createProject(req.body);
    res.json({ data: project });
}));

router.patch('/projects/:id', asyncRoute(async (req, res) => {
    const project = await app.renameProject(req.params.id, req.body.name);
    res.json({ data: project });
}));

router.get('/design', asyncRoute(async (req, res) => {
    const design = await Design.findOne({ _id: req.query.id });
    if (!design) {
        throw new Error('Desing not found');
    }
    const project = await Project.findOne({ _id: design.project }).lean();
    if (!project) {
        throw new Error('Project not found');
    }
    let files = await File.find({ design: design._id }).sort({ createdAt: -1 }).lean();
    files = files.map((file) => {
        file.src = `/${config.uploadsDir}/${file.design}/${file._id}.png`;
        file.name = file._id;
        file.href = `/design?id=${design.id}#${file._id}`;
        return file;
    });
    const breadcrumbs = await app.breadcrumbs(design);
    res.json({ design, breadcrumbs, files });
}));

router.patch('/designs/:id', asyncRoute(async (req, res) => {
    const design = await app.renameDesign(req.params.id, req.body.name);
    res.json({ data: design });
}));

router.post('/designs', asyncRoute(async (req, res) => {
    const design = await app.createDesign(req.body);
    res.json({ data: design });
}));

module.exports = router;
