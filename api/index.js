const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
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
    const files = await File.find({ design }).sort({ createdAt: -1 });
    const breadcrumbs = await app.breadcrumbs(design);
    res.json({ design, breadcrumbs, files });
}));

const storage = multer.diskStorage({
    destination(req, file, callback) {
        Design.findOne({ _id: req.params.id })
            .then((design) => {
                if (!design) {
                    return callback(new Error('Design not found'));
                }

                const dir = path.join(config.publicDir, config.uploadsDir, design._id.toString());
                fs.mkdir(dir, (err) => {
                    if (err && err.code !== 'EEXIST') {
                        return callback(err);
                    }

                    callback(null, dir);
                });
            });
    },
    filename(req, file, callback) {
        Design.findOne({ _id: req.params.id })
            .then((design) => {
                if (!design) {
                    return callback(new Error('Design not found'));
                }

                const ext = path.extname(file.originalname);
                return File.create({ design: design._id, ext });
            }).then((doc) => {
                callback(null, `${doc._id}${doc.ext}`);
            }).catch(callback);
    }
});
const upload = multer({ storage });

router.post('/designs/:id/uploads',
    upload.array('files', 20),
    asyncRoute(async (req, res) => {
        const files = await app.designFilesList(req.params.id);
        res.json({ data: files });
    })
);

router.delete('/designs/:designId/files/:fileId', asyncRoute(async (req, res) => {
    const file = await File.findOneAndRemove({  _id: req.params.fileId, design: req.params.designId });
    if (!file) {
        throw new Error('File not found');
    }

    const files = await app.designFilesList(req.params.designId);
    res.json({ data: files });
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
