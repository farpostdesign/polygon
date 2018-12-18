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
    });
});
