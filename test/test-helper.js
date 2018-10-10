const env = process.env.NODE_ENV;
if (env !== 'test') {
    throw new Error(`Wrong environment for tests \`${env}\``);
}

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const testServer = require('supertest');
const express = require('express');
const expressApp = express();
const api = require('../api');
const Project = require('../app/models/project');
const Design = require('../app/models/design');

/**
 * API server setup
 *
 */

expressApp.use(express.json());

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
    api: testServer(expressApp.use('/api', api)),

    /**
     * Expose models for tests
     */
    Project,
    Design
};
