const { loginLink } = require('../../../../services/auth');

describe('auth.loginLink', () => {
    it('return login link with login token', async () => {
        const link = await loginLink();
        const url = new URL(link);
        expect(url.pathname).toBe('/what-it-will-be');
        expect(url.searchParams.get('loginToken')).toHaveLength(16);
    });

    it('creates unique tokens each time', async () => {
        const link1 = await loginLink();
        const token1 = new URL(link1).searchParams.get('loginToken');
        const link2 = await loginLink();
        const token2 = new URL(link2).searchParams.get('loginToken');
        expect(token1).toHaveLength(16);
        expect(token2).toHaveLength(16);
        expect(token1).not.toEqual(token2);
    });
});
