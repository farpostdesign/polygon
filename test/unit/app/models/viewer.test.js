const { Viewer } = require('test-helper');

describe('Viewer model', () => {
    it('works', () => {
        expect(() => {
            new Viewer({
                email: 'viewer@example.com',
                loginToken: '123',
                viewToken: '456'
            });
        }).not.toThrow();
    });
});
