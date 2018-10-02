const env = process.env.NODE_ENV;
if (env !== 'test') {
    throw new Error(`Wrong environment for tests \`${env}\``);
}
const testServer = require('supertest');
const expressApp = require('express')();
const api = require('../api');
const Project = require('../app/models/project');
const Design = require('../app/models/design');

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
