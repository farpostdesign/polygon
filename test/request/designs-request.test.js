const { Project, Design, api } = require('test-helper');

describe('POST /api/designs', () => {
    it('respond 200', async () => {
        const res = await api.post('/api/projects').send({ name: 'project' });
        expect(res.statusCode).toBe(200);
    });

    it('creates design', async () => {
        const project = await Project.create({ name: 'project' });
        await api.post('/api/designs').send({ name: 'design', project: project._id });
        expect(
            await Design.count()
        ).toBe(1);
    });

    it('returns created design', async () => {
        const project = await Project.create({ name: 'project' });
        const res = await api.post('/api/designs').send({ name: 'design', project: project._id });
        expect(res.body.data.name).toBe('design');
    });
});

describe('PATCH /api/designs/:id', () => {
    it('respond 200', async () => {
        const project = await Project.create({ name: 'a' });
        const design = await Design.create({ name: 'b', project });
        const res = await api.patch(`/api/designs/${design._id}`).send({ name: 'b' });
        expect(res.statusCode).toBe(200);
    });

    it('renames design', async () => {
        const project = await Project.create({ name: 'a' });
        const design = await Design.create({ name: 'b', project });
        await api.patch(`/api/designs/${design._id}`).send({ name: 'bbb' });
        expect(
            await Design.count()
        ).toBe(1);
    });

    it('returns updated design', async () => {
        const project = await Project.create({ name: 'a' });
        const design = await Design.create({ name: 'b', project });
        const res = await api.patch(`/api/designs/${design._id}`).send({ name: 'bbb' });
        expect(res.body.data._id).toBe(design.id);
        expect(res.body.data.name).toBe('bbb');
    });
});
