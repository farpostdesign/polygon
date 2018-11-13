require('../../test-helper');
const { Types } = require('mongoose');
const { createFiles } = require('../../../app/');

describe('createFiles', () => {
    it('creates file by incrementing position', async () => {
        const designId = new Types.ObjectId;
        const file = {
            filename: 'file.png'
        };
        let created = await createFiles({ files: file, designId });
        expect(created[0].position).toBe(1);
        created = await createFiles({ files: file, designId });
        expect(created[0].position).toBe(2);
        created = await createFiles({ files: file, designId });
        expect(created[0].position).toBe(3);
    });
});
