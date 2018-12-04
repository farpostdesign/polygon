const { sendedMessages } = require('test-helper');
const { messagesList, providersList, send } = require('../../../services/transac-message');

describe('Transactional Message module', () => {
    describe('messagesList.register', () => {
        it('adding passed message with given name to list of messages', () => {
            const customMessage = jest.fn();
            messagesList.register('customName', customMessage);
            expect(messagesList.get('customName')).toEqual(customMessage);
        });
    });

    describe('providersList.register', () => {
        it('adding passed provider with given name to list of providers', () => {
            const customProvider = jest.fn();
            providersList.register('customName', customProvider);
            expect(providersList.get('customName')).toEqual(customProvider);
        });
    });

    describe('send', () => {
        it('calls send for user prefered messaging provider', () => {
            const testProvider = jest.fn();
            const someMessageMockInstance = jest.fn();
            const someMessageMock = jest.fn().mockImplementation(() => {
                return someMessageMockInstance;
            });
            const recipientMock = {
                email: 'user@test.com',
                preferedMessageProvider: 'testProvider'
            };
            messagesList.register('testMessage', someMessageMock);
            providersList.register('testProvider', testProvider);
            send({ to: recipientMock, message: 'testMessage' });
            expect(testProvider).toBeCalledWith(recipientMock.email, someMessageMockInstance);
        });

        it('sending message', () => {
            const recipientMock = {};
            const testMessageMockInstance = jest.fn();
            const testMessageMock = jest.fn().mockImplementation(() => {
                return testMessageMockInstance;
            });
            messagesList.register('testMessage', testMessageMock);
            send({ to: recipientMock, message: 'testMessage' });
            expect(sendedMessages).toHaveLength(1);
            expect(sendedMessages[0].recipient).toBe(recipientMock);
            expect(sendedMessages[0].message).toBe(testMessageMockInstance);
        });

        it('if user has no provider preferences sending with default provider', () => {
            const someMessageMockInstance = jest.fn();
            const someMessageMock = jest.fn().mockImplementation(() => {
                return someMessageMockInstance;
            });
            const recipientMock = {
                email: 'user@test.com',
                preferedMessageProvider: null
            };
            messagesList.register('testMessage', someMessageMock);
            providersList.default = jest.fn();
            send({ to: recipientMock, message: 'testMessage' });
            expect(providersList.default).toBeCalledWith(recipientMock.email, someMessageMockInstance);
        });
    });
});
