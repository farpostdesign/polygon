const { api, Project } = require('test-helper');

describe('GET /api/project', () => {
    it('respond 200', async () => {
        const project = await Project.create({ name: 'abra' });
        const res = await api.get(`/api/project?id=${project.id}`);
        expect(res.statusCode).toBe(200);
    });
});
