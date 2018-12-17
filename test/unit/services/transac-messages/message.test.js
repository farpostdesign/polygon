const Message = require('../../../../services/transac-messages/message');

describe('TransacMessages/Message', () => {
    const provider = jest.fn();

    describe('send', () => {
        it('calls provider with self', () => {
            const msg = new Message(provider);
            msg.send();
            expect(provider).toBeCalledWith(msg);
        });
    });

    describe('text', () => {
        it('renders template file with renderer', async () => {
            const renderer = {
                renderFile: jest.fn()
            };
            const msg = new Message(provider, 'template-path', { a: 'b' }, renderer);
            await msg.text();
            expect(renderer.renderFile).toBeCalledWith(
                'template-path.text',
                { a: 'b' },
                { 'async': true }
            );
        });
    });
});
