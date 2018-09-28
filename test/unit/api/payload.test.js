const payload = require('../../../api/payload');

describe('API payload', () => {
    it('returns empty array for empty array', () => {
        expect(payload([])).toEqual([]);
    });

    it('populates href property based on id and constructor', () => {
        const collection = [
            { id: 3 },
            { id: 'myid' }
        ];
        const expected = [
            { id: 3, href: '/asd?id=3' },
            { id: 'myid', href: '/asd?id=myid' }
        ];
        expect(payload(collection, 'asd')).toEqual(expected);
    });
});
