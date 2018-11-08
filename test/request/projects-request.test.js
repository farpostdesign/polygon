const { Project, api } = require('test-helper');

describe('GET /api/projects', () => {
    it('respond 200', async () => {
        const res = await api.get('/api/projects');
        expect(res.statusCode).toBe(200);
    });
});

describe('POST /api/projects', () => {
    it('respond 200', async () => {
        const res = await api.post('/api/projects').send({ name: 'project' });
        expect(res.statusCode).toBe(200);
    });

    it('creates project', async () => {
        await api.post('/api/projects').send({ name: 'project' });
        expect(
            await Project.count()
        ).toBe(1);
    });

    it('returns created project', async () => {
        const res = await api.post('/api/projects').send({ name: 'project' });
        expect(res.body.data.name).toBe('project');
    });
});

describe('PATCH /api/project/:id', () => {
    it('respond 200', async () => {
        const project = await Project.create({ name: 'a' });
        const res = await api.patch(`/api/projects/${project._id}`).send({ name: 'b' });
        expect(res.statusCode).toBe(200);
    });

    it('renames project', async () => {
        const project = await Project.create({ name: 'a' });
        await api.patch(`/api/projects/${project._id}`).send({ name: 'b' });
        expect(
            await Project.count()
        ).toBe(1);
    });

    it('returns updated project', async () => {
        const project = await Project.create({ name: 'a' });
        const res = await api.patch(`/api/projects/${project._id}`).send({ name: 'b' });
        expect(res.body.data._id).toBe(project.id);
        expect(res.body.data.name).toBe('b');
    });
});
