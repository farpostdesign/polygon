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
    server.use('/api', api);
    server.get('*', frontEndRequestHandler);
    server.listen(config.serverListenTo, (err) => {
        if (err) {
            throw err;
        }
        serverDebug(`Server listening on \`${config.serverListenTo}\``);
    });
});
