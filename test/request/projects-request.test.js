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
