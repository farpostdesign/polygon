const { Viewer, User, authWith, api } = require('test-helper');

describe('GET /api/viewers', () => {
    it('responds 401 when unauthenticated', async () => {
        const res = await api.get('/api/with-auth/viewers');
        expect(res).toHaveStatus(401);
    });

    it('responds 200 when unauthenticated', async () => {
        const user = await User.create({ email: 'user@example.com', password: '12345678', messagingProvider: 'test', messagingAccount: '@user' });
        const res = await api.get('/api/with-auth/viewers').use(authWith(user));
        expect(res).toHaveStatus(200);
    });

    it('resonds with a list of all viewers', async () => {
        const viewers = await Viewer.create([
            { email: 'v1@example.com', messagingProvider: 'test', messagingAccount: 'v1@example.com' },
            { email: 'v2@example.com', messagingProvider: 'test', messagingAccount: 'v2@example.com' }
        ]);
        const res = await api.get('/api/viewers');
        expect(res.body).toHaveLength(2);
        const expected = viewers.map((doc) => doc.email);
        const recieved = res.body.map((doc) => doc.email);
        expect(recieved).toEqual(expected);
    });
});
