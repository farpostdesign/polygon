const { User, Viewer } = require('test-helper');
const auth = require('../../../services/auth');
const jwt = require('jsonwebtoken');

describe('Auth service', () => {
    describe('issueToken', () => {
        it('includes given user Id and type User for given User model', async () => {
            const user = await User.create({ email: 'user@example.con', messagingProvider: 'test', messagingAccount: '@user' });
            const token = await auth.issueToken(user);
            const decode = jwt.decode(token);
            expect(decode.userId).toEqual(user.id);
            expect(decode.userType).toEqual('User');
        });

        it('includes given viewer Id and type Viewer for given Viewer model', async () => {
            const viewer = await Viewer.create({ email: 'viewer@example.con', messagingProvider: 'test', messagingAccount: '@viewer' });
            const token = await auth.issueToken(viewer);
            const decode = jwt.decode(token);
            expect(decode.userId).toEqual(viewer.id);
            expect(decode.userType).toEqual('Viewer');
        });

        it('works with any instance with id and a constructor with model name', async () => {
            function FakeUser({ id }) {
                this._id = id;
                this.id = id;
            }
            FakeUser.modelName = 'FakeUser';
            const fakeUser = new FakeUser({ id: 'fake-id' });
            const token = await auth.issueToken(fakeUser);
            const decode = jwt.decode(token);
            expect(decode.userId).toEqual(fakeUser.id);
            expect(decode.userType).toEqual('FakeUser');
        });

        it('throw error when given object do not have model name', async () => {
            function FakeUser({ id }) {
                this._id = id;
                this.id = id;
            }
            const fakeUser = new FakeUser({ id: 'fake-id' });
            expect(() => {
                auth.issueToken(fakeUser);
            }).toThrow('Can not get modelName from `FakeUser` constructor');
        });

        it('throw error when given object have no _id', async () => {
            function FakeUser() {
                // intentionaly empty
            }
            FakeUser.modelName = 'FakeUser';
            const fakeUser = new FakeUser();
            expect(() => {
                auth.issueToken(fakeUser);
            }).toThrow('Can not get _id from `FakeUser` instance');
        });

        it('receives options to JWT as second argumest ', async () => {
            function FakeUser({ id }) {
                this._id = id;
                this.id = id;
            }
            FakeUser.modelName = 'FakeUser';
            const fakeUser = new FakeUser({ id: 'fake-id' });
            const expiresIn = 1;
            const token = await auth.issueToken(fakeUser, { expiresIn });
            const tokenExp = Math.floor(Date.now() / 1000) + expiresIn;
            const decode = jwt.decode(token);
            expect(decode.exp).toEqual(tokenExp);
        });
    });
});
