const { optionsForSelect } = require('../../../utils');

describe('optionsForSelect', () => {
    const opts = {
        valueKey: 'number',
        labelKey: 'title'
    };

    it('transform single item to value label object', () => {
        const collection = [
            { title: 'A', number: 1 }
        ];
        expect(
            optionsForSelect(collection, opts)
        ).toEqual([{ value: 1, label: 'A' }]);
    });

    it('transform collection into array of value label object', () => {
        const collection = [
            { title: 'An', number: 1 },
            { title: 'Ny', number: 2 },
            { title: 'Oi', number: 3 }
        ];
        const expected = [
            { value: 1, label: 'An' },
            { value: 2, label: 'Ny' },
            { value: 3, label: 'Oi' }
        ];
        const actual = optionsForSelect(collection, opts);
        expect(actual).toEqual(expected);
    });

    it('by default has valueKey _id and labelKey name', () => {
        const collection = [
            { name: 'An', _id: 1 },
            { name: 'Ny', _id: 2 },
            { name: 'Oi', _id: 3 }
        ];
        const expected = [
            { value: 1, label: 'An' },
            { value: 2, label: 'Ny' },
            { value: 3, label: 'Oi' }
        ];
        const actual = optionsForSelect(collection);
        expect(actual).toEqual(expected);
    });

    it('returns empty array for empty collection', () => {
        const collection = [];
        expect(optionsForSelect(collection)).toEqual([]);
    });
});
