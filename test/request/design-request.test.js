const { api, Design, Project } = require('test-helper');

describe('GET /api/project', () => {
    it('respond 200', async () => {
        const project = await Project.create({ name: 'abra' });
        const design = await Design.create({ name: 'abra', project });
        const res = await api.get(`/api/design?id=${design.id}`);
        expect(res.statusCode).toBe(200);
    });
});
