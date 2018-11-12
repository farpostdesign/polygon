const { Project, Design, File, api } = require('test-helper');

describe('DELETE /api/designs/:designId/files/:fileId', () => {
    it('respond 200', async () => {
        const project = await Project.create({ name: 'project' });
        const design = await Design.create({ name: 'design', project });
        const file = await File.create({ design, ext: '.png' });
        const res = await api.delete(`/api/designs/${design.id}/files/${file.id}`);
        expect(res.statusCode).toBe(200);
    });

    it('deletes file by passed file id', async () => {
        const project = await Project.create({ name: 'project' });
        const design = await Design.create({ name: 'design', project });
        const file = await File.create({ design, ext: '.png' });
        expect(await File.count()).toBe(1);
        await api.delete(`/api/designs/${design.id}/files/${file.id}`);
        expect(await File.count()).toBe(0);
    });
});
