const fs = require('fs');
const express = require('express');
const next = require('next');
const api = require('./api');
const serverDebug = require('debug')('polygon:server');
const config = require('./config');
require('./services/db');

const server = express();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const frontEndRequestHandler = app.getRequestHandler();

// Remove previous socket if exists
if (config.production) {
    try {
        fs.unlinkSync(config.serverListenTo);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
}

app.prepare().then(() => {
    server.use(express.json());
    server.use(express.static('public'));
    // API
    server.use('/api', api);
    // API Error handler
    server.use((err, _req, res, _next) => {
        const payload = {
            errors: [err.message]
        };
        if (dev) {
            payload.stack = err.stack;
        }
        res.status(err.statusCode || 500);
        res.json(payload);
    });
    // Next app
    server.get('*', frontEndRequestHandler);
    server.listen(config.serverListenTo, (err) => {
        if (err) {
            throw err;
        }
        serverDebug(`Server listening on \`${config.serverListenTo}\``);
    });
});
