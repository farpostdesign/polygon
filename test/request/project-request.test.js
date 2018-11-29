const { Project, User, api, authWith } = require('test-helper');

describe('GET /api/project', () => {
    it('responds 200 when authenticated', async () => {
        const user = await User.create({ email: 'user@example.com', password: '12345678' });
        const project = await Project.create({ name: 'abra' });
        const res = await api.get(`/api/with-auth/project?id=${project.id}`).use(authWith(user));
        expect(res).toHaveStatus(200);
    });

    it('responds 401 when unauthenticated', async () => {
        const project = await Project.create({ name: 'abra' });
        const res = await api.get(`/api/with-auth/project?id=${project.id}`);
        expect(res).toHaveStatus(401);
    });
});
