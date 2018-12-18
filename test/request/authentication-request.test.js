const { Viewer, sendedMessages, api } = require('test-helper');

describe('Authentication requests', () => {
    describe('POST /loginlink', () => {
        it('responds with status 200', async () => {
            const viewer = await Viewer.create({ email: 'viewer@example.com', messagingProvider: 'test', messagingAccount: 'viwer@example.com' });
            const res = await api.post('/api/loginlink').send({ email: viewer.email });
            expect(res).toHaveStatus(200);
        });

        it('sends message with login link', async () => {
            const viewer = await Viewer.create({ email: 'viewer@example.com', messagingProvider: 'test', messagingAccount: 'viwer@example.com' });
            const loginLink = /https:\/\/polygon-test.localhost:3333\/linklogin\/[a-z0-9]{16}/;

            await api.post('/api/loginlink').send({ email: viewer.email });

            expect(sendedMessages).toHaveLength(1);
            expect(sendedMessages[0].recipient).toEqual(viewer.messagingAccount);
            expect(await sendedMessages[0].text()).toMatch(loginLink);
            expect(await sendedMessages[0].html()).toMatch(loginLink);
        });

        it('saves loginToken into viewer document', async () => {
            let viewer = await Viewer.create({ email: 'viewer@example.com', messagingProvider: 'test', messagingAccount: 'viwer@example.com', loginToken: null });
            await api.post('/api/loginlink').send({ email: viewer.email });
            viewer = await Viewer.findById(viewer._id);
            expect(viewer.loginToken).not.toEqual(null);
        });
    });

    describe('GET /loginlink/:token', () => {
        it('responds with status 302', async () => {
            const loginToken = 'login-token';
            await Viewer.create({ email: 'viewer@example.com', messagingProvider: 'test', messagingAccount: 'viwer@example.com', loginToken });
            const res = await api.get(`/api/loginlink/${loginToken}`);
            expect(res).toHaveStatus(302);
        });

        it('sets viewer token cookie', async () => {
            const loginToken = 'login-token';
            await Viewer.create({ email: 'viewer@example.com', messagingProvider: 'test', messagingAccount: 'viwer@example.com', loginToken });
            const res = await api.get(`/api/loginlink/${loginToken}`);
            expect(res).toSetCookie('viewer-token');
        });

        it('redirects to root page by default', async () => {
            const loginToken = 'login-token';
            await Viewer.create({ email: 'viewer@example.com', messagingProvider: 'test', messagingAccount: 'viwer@example.com', loginToken });
            const res = await api.get(`/api/loginlink/${loginToken}`);
            expect(res.headers.location).toEqual('/');
        });

        it('redirects to page from get redirect params', async () => {
            const loginToken = 'login-token';
            await Viewer.create({ email: 'viewer@example.com', messagingProvider: 'test', messagingAccount: 'viwer@example.com', loginToken });
            const res = await api.get(`/api/loginlink/${loginToken}?redirect=/some/previous-page`);
            expect(res.headers.location).toEqual('/some/previous-page');
        });

        it('removes loginToken from logged in viewer', async () => {
            const loginToken = 'login-token';
            let viewer = await Viewer.create({ email: 'viewer@example.com', messagingProvider: 'test', messagingAccount: 'viwer@example.com', loginToken });
            await api.get(`/api/loginlink/${loginToken}`);
            viewer = await Viewer.findById(viewer._id);
            expect(viewer.loginToken).toEqual(null);
        });
    });
});
