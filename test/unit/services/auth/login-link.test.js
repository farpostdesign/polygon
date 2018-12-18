const { loginLink } = require('../../../../services/auth');

describe('auth.loginLink', () => {
    it('return login link with login token and given path', async () => {
        const link = await loginLink('/some-path');
        const url = new URL(link);
        expect(url.pathname).toMatch(/\/some-path\/[a-z0-9]{16}/);
    });

    it('creates unique tokens each time', async () => {
        const link1 = await loginLink('/some-path');
        const pathWithToken1 = new URL(link1).pathname;
        const link2 = await loginLink('/some-path');
        const pathWithToken2 = new URL(link2).pathname;
        expect(pathWithToken1).not.toEqual(pathWithToken2);
    });
});
