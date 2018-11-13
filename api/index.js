const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const Project = require('../app/models/project');
const Design = require('../app/models/design');
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
    const files = await app.designFilesList(design.id);
    const breadcrumbs = await app.breadcrumbs(design);
    res.json({ design, breadcrumbs, files });
}));

const ensureDesign = (req, res, next) => {
    Design.findOne({ _id: req.params.id }).lean()
        .then((design) => {
            if (!design) {
                next('Design not found');
            }
            req.polygon = req.polygon || {};
            req.polygon.design = design;
            next();
        }).catch(next);
};

const storage = multer.diskStorage({
    destination(req, file, callback) {
        const dir = path.join(
            config.publicDir,
            config.uploadsDir,
            req.polygon.design._id.toString()
        );
        fs.mkdir(dir, (err) => {
            if (err && err.code !== 'EEXIST') {
                return callback(err);
            }

            callback(null, dir);
        });
    },
    filename(req, file, callback) {
        const timestamp = Date.now();
        const { name, ext } = path.parse(file.originalname);

        callback(null, `${name}-${timestamp}${ext}`);
    }
});
const upload = multer({ storage });

router.post('/designs/:id/uploads',
    ensureDesign,
    upload.array('files', 20),
    asyncRoute(async (req, res) => {
        await app.createFiles({ files: req.files, designId: req.polygon.design._id });
        const files = await app.designFilesList(req.params.id);
        res.json({ data: files });
    })
);

router.put('/designs/:id/files/:fileId',
    ensureDesign,
    upload.single('file'),
    asyncRoute(async (req, res) => {
        const removedFile = await app.removeFile(req.params.fileId);
        req.file.position = removedFile.position;
        await app.createFiles({ files: req.file, designId: req.polygon.design._id });
        const files = await app.designFilesList(req.params.id);
        res.json({ data: files });
    })
);

router.delete('/designs/:designId/files/:fileId', asyncRoute(async (req, res) => {
    const file = await app.removeFile(req.params.fileId);
    if (!file) {
        throw new Error('File not found');
    }

    await app.reorderFiles(req.params.designId);

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
