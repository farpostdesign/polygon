const { api, User } = require('test-helper');

describe('POST /api/token', () => {
    it('respond with status 200 on successful authentication', async () => {
        await User.create({ email: 'user@example.com', password: '12345678', messagingProvider: 'test', messagingAccount: '@user' });
        const payload = {
            email: 'user@example.com',
            password: '12345678'
        };
        const res = await api.post('/api/token').send(payload);
        expect(res).toHaveStatus(200);
    });

    it('sets token cookie', async () => {
        await User.create({ email: 'user@example.com', password: '12345678', messagingProvider: 'test', messagingAccount: '@user' });
        const payload = {
            email: 'user@example.com',
            password: '12345678'
        };
        const res = await api.post('/api/token').send(payload);
        expect(res).toSetCookie('token');
    });

    it('respomd with status 400 if send empty credentials', async () => {
        const payload = {
            email: '',
            password: ''
        };
        const res = await api.post('/api/token').send(payload);
        expect(res).toHaveStatus(400);
    });

    it('does not set a token cookie if send empty credentials', async () => {
        const payload = {
            email: '',
            password: ''
        };
        const res = await api.post('/api/token').send(payload);
        expect(res).not.toSetCookie('token');
    });

    it('responds with status 401 if wrong credentials', async () => {
        await User.create({ email: 'user@example.com', password: 'pass', messagingProvider: 'test', messagingAccount: '@user' });
        const payload = {
            email: 'user@example.com',
            password: 'other pass'
        };
        const res = await api.post('/api/token').send(payload);
        expect(res).toHaveStatus(401);
    });

    it('does not set a token cookie if wrong credentials', async () => {
        await User.create({ email: 'user@example.com', password: 'pass', messagingProvider: 'test', messagingAccount: '@user' });
        const payload = {
            email: 'user@example.com',
            password: 'other pass'
        };
        const res = await api.post('/api/token').send(payload);
        expect(res).not.toSetCookie('token');
    });
});
