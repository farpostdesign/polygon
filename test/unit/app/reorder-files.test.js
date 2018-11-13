const { Types } = require('mongoose');
const { File } = require('test-helper');
const { reorderFiles } = require('../../../app');

describe('reorderFiles', () => {
    it('changes the order of the remaining files', async () => {
        const designId = new Types.ObjectId;
        const files = await Promise.all([
            File.create({ design: designId, filename: '1.png', position: 1 }),
            File.create({ design: designId, filename: '2.png', position: 2 }),
            File.create({ design: designId, filename: '3.png', position: 4 }),
            File.create({ design: designId, filename: '4.png', position: 5 }),
            File.create({ design: designId, filename: '5.png', position: 10 })
        ]);
        await reorderFiles(designId);
        const reorderedFiles = await File.find({ design: designId }).sort({ position: 1 });
        expect(reorderedFiles[0].id).toBe(files[0].id);
        expect(reorderedFiles[0].position).toBe(1);
        expect(reorderedFiles[1].id).toBe(files[1].id);
        expect(reorderedFiles[1].position).toBe(2);
        expect(reorderedFiles[2].id).toBe(files[2].id);
        expect(reorderedFiles[2].position).toBe(3);
        expect(reorderedFiles[3].id).toBe(files[3].id);
        expect(reorderedFiles[3].position).toBe(4);
        expect(reorderedFiles[4].id).toBe(files[4].id);
        expect(reorderedFiles[4].position).toBe(5);
    });
});
