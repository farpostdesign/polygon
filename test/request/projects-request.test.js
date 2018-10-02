const { api } = require('test-helper');

describe('GET /api/projects', () => {
    it('respond 200', async () => {
        const res = await api.get('/api/projects');
        expect(res.statusCode).toBe(200);
    });
});
