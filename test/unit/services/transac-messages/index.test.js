const Messanger = require('../../../../services/transac-messages');

describe('TransacMessages', () => {
    describe('registerProvider', () => {
        it('creates method when register provider', () => {
            const messanger = new Messanger();
            const provider = jest.fn();
            expect(messanger.testProvider).toBeUndefined();
            messanger.registerProvider('test', provider);
            expect(messanger.test).toBeInstanceOf(Function);
        });
    });

    describe('removeProvider', () => {
        it('removes registered provider', () => {
            const messanger = new Messanger();
            const provider = jest.fn();
            expect(messanger.providerToDelete).toBeUndefined();
            messanger.registerProvider('providerToDelete', provider);
            expect(messanger.providerToDelete).not.toBeUndefined();
            messanger.removeProvider('providerToDelete');
            expect(messanger.providerToDelete).toBeUndefined();
        });
    });

    describe('reset', () => {
        it('removes all providers', () => {
            const messanger = new Messanger();
            expect(messanger.providerA).toBeUndefined();
            expect(messanger.providerB).toBeUndefined();
            messanger.registerProvider('providerA', jest.fn());
            messanger.registerProvider('providerB', jest.fn());
            expect(messanger.providerA).not.toBeUndefined();
            expect(messanger.providerB).not.toBeUndefined();
            messanger.reset();
            expect(messanger.providerA).toBeUndefined();
            expect(messanger.providerB).toBeUndefined();
        });
    });

    it('sending a message with a provider', () => {
        const messanger = new Messanger();
        const mailProvider = jest.fn();
        messanger.registerProvider('Mail', mailProvider);
        const msg = messanger.Mail('hello');
        msg.send();
        expect(mailProvider).toBeCalledWith(msg);
    });

    it('sending a message with a template and given provider', async () => {
        const messanger = new Messanger({ templatesDir: 'test/support/templates' });
        const sendFn = jest.fn();
        const mailProvider = async (message) => {
            const text = await message.text();
            const html = await message.html();
            return sendFn({ text, html });
        };
        messanger.registerProvider('Mail', mailProvider);
        await messanger.Mail('transac-messages-hello', { name: 'Di' }).send();
        expect(sendFn).toBeCalledWith({
            text: 'Hello Di!\n',
            html: '<h1>Hello</h1><p>Di!</p>\n'
        });
    });

    describe('configuration', () => {
        it('append config.templateDir to template name', () => {
            const messanger = new Messanger({ templatesDir: 'myapp/templates' });
            const mailProvider = jest.fn();
            messanger.registerProvider('Mail', mailProvider);
            const msg = messanger.Mail('hello');
            expect(msg.template).toMatch('myapp/templates/hello');
        });
    });
});
