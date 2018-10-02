const { breadcrumbs } = require('../../../app/');

describe('Breadcrumbs', () => {
    it('returns path to root and current crumb for current resource without ascendants', async () => {
        const ascendants = () => [];
        const current = { name: 'Abra', ascendants };
        await expect(breadcrumbs(current)).resolves.toEqual([breadcrumbs.ROOT, { name: 'Abra' }]);
    });

    it('returns path with current ascendants', async () => {
        const ascendants = () => [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
        const current = { name: 'C', ascendants };
        await expect(breadcrumbs(current)).resolves.toEqual([
            breadcrumbs.ROOT,
            { id: 1, href: '/projects?id=1', name: 'A' },
            { id: 2, href: '/projects?id=2', name: 'B' },
            { name: 'C' }
        ]);
    });
});
