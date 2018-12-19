const { pickProps } = require('../../../utils');

describe('util.pickProps', () => {
    it('return object with given properties from other object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(pickProps(obj, 'a', 'b')).toEqual({ a: 1, b:2 });
    });

    it('return empty object when no given properties in other object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(pickProps(obj, 'z', 'y')).toEqual({});
    });
});
