const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const next = require('next');
const api = require('./api');
const apiAuth = require('./api/authentication');
const config = require('./config');
const serverDebug = require('debug')('polygon:server');
const auth = require('./services/auth');
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
    server.use(cookieParser());
    server.use(express.json());
    server.use(express.static('public'));

    // API
    server.use('/api', apiAuth);
    server.use('/api', auth.jwtMiddleware, api);

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
