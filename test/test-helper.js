const env = process.env.NODE_ENV;
if (env !== 'test') {
    throw new Error(`Wrong environment for tests \`${env}\``);
}

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const testServer = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const api = require('../api');
const apiToken = require('../api/token');
const auth = require('../services/auth');
const Project = require('../app/models/project');
const Design = require('../app/models/design');
const User = require('../app/models/user');
const Viewer = require('../app/models/viewer');
const File = require('../app/models/file');
const { messenger } = require('../services/messaging');

/**
 * Superagent test plugins
 *
 */

function superagentAuthenticateWith(user) {
    return async (req) => {
        const currentCookie = req.header['Cookie'];
        const token = await auth.issueToken(user);
        const cookieString = [currentCookie, `token=${token}`].join('; ');
        req.set('Cookie', cookieString);
    };
}

/**
 * Jest custom matchers
 *
 */

expect.extend({
    toHaveStatus(receivedResponse, expected) {
        const received = receivedResponse.statusCode;
        const body = JSON.stringify(receivedResponse.body);
        if (received === expected) {
            return {
                pass: true,
                message: () => `expect(${received}).not.toRespondWithStatus(${expected})\nbody: ${body}`
            };
        } else {
            return {
                pass: false,
                message: () => `expect(${received}).toRespondWithStatus(${expected})\nbody: ${body}`
            };
        }
    },
    toHaveError(receivedResponse, expectedStatus, expectedError) {
        const receivedStatus = receivedResponse.statusCode;
        const receivedError = receivedResponse.body.error;
        if (receivedStatus === expectedStatus && receivedError === expectedError) {
            return {
                pass: true,
                message: () => `expect(${receivedStatus}, ${receivedError}).not.toRespondWithStatus(${expectedStatus}, ${expectedError})`
            };
        } else {
            return {
                pass: false,
                message: () => `expect(${receivedStatus}, ${receivedError}).toRespondWithStatus(${expectedStatus}, ${expectedError})`
            };
        }
    },
    toSetCookie(receivedResponse, expectedCookie, expectedValue, options = {}) {
        const receivedSetCookie = receivedResponse.headers['set-cookie'];

        let expectToMatch = expectedValue ? `${expectedCookie}=${expectedValue}` : expectedCookie;
        if (options.httOnly) {
            expectToMatch = `${expectToMatch}; HttpOnly`;
        }
        if (options.secure) {
            expectToMatch = `${expectToMatch}; secure`;
        }
        const expectedSetCookie = new RegExp(expectToMatch);
        if (expectedSetCookie.test(receivedSetCookie)) {
            return {
                pass: true,
                message: () => `expected headers set-cookie: ${receivedSetCookie}\n to not match ${expectToMatch}`
            };
        } else {
            return {
                pass: false,
                message: () => `expected headers set-cookie: ${receivedSetCookie}\n to match ${expectToMatch}`
            };
        }
    }
});

/**
 * TransacMessage setup
 *
 */

const sendedMessages = [];

beforeEach(() => {
    messenger.reset();
    sendedMessages.splice(0, sendedMessages.length);
    messenger.registerProvider('test', (message) => {
        sendedMessages.push(message);
    });
});

/**
 * API server setup
 *
 */

const expressApp = express();
expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use('/api', api);
expressApp.use('/api', apiToken);
expressApp.use('/api/with-auth', auth.jwtMiddleware, api);
// Error handler
expressApp.use((err, _req, res, _next) => {
    const payload = {
        errors: [err.message]
    };
    payload.stack = err.stack;
    res.status(err.statusCode || 500);
    res.json(payload);
});

/**
 * DB setup
 *
 */

let dbServer;

beforeEach(async () => {
    dbServer = new MongoMemoryServer();
    const dbConnectionURI = await dbServer.getConnectionString();
    await mongoose.connect(dbConnectionURI, (err) => {
        if (err) {
            throw err;
        }
    });
});

afterEach(() => {
    mongoose.disconnect();
    dbServer.stop();
});

/**
 * Expose
 *
 */

module.exports = {
    /**
     * API server to testing Express router
     *
     * example:
     *      api.get('/api/projects').then(yourAssertions);
     *
     *  for detailed information please refer
     *  to the documentation of supertest module
     */
    api: testServer(expressApp),

    /**
     * Expose getter that returns sended transactional messages
     *
     */
    sendedMessages,

    /**
     * Authentication test helpers
     *
     */
    authWith: superagentAuthenticateWith,

    /**
     * Expose models for tests
     */
    Project,
    Design,
    File,
    User,
    Viewer
};
