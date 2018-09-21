export default [
    { id: 1, title: 'Dazel', href: '/projects?id=1' },
    { id: 2, title: 'Drom', href: '/projects?id=2' },
    { id: 3, title: 'Company', href: '/projects?id=3', parent: 1 },
    { id: 4, title: 'Dazel store', href: '/projects?id=4', parent: 1 },
    { id: 5, title: 'Merch', href: '/projects?id=5', parent: 2 },
    { id: 6, title: 'Landing', href: '/projects?id=6', parent: 4 },
    { id: 7, title: 'Cart', href: '/projects?id=7', parent: 4 },
    { id: 100, title: 'New project with the name that you just typed', href: '/projects?id=100' }
];

