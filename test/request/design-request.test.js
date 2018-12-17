const { Design, Project, User, api, authWith } = require('test-helper');

describe('GET /api/project', () => {
    it('responds 200', async () => {
        const user = await User.create({ email: 'user@example.com', password: '12345678', messagingProvider: 'mm', messagingAccount: '@u' });
        const project = await Project.create({ name: 'abra' });
        const design = await Design.create({ name: 'abra', project });
        const res = await api.get(`/api/design?id=${design.id}`).use(authWith(user));
        expect(res).toHaveStatus(200);
    });

    it('responds 401 when unauthenticated', async () => {
        const project = await Project.create({ name: 'abra' });
        const design = await Design.create({ name: 'abra', project });
        const res = await api.get(`/api/with-auth/design?id=${design.id}`);
        expect(res).toHaveStatus(401);
    });
});
