const fs = require('fs');
const http = require('http');
const url = require('url');
const next = require('next');
const serverDebug = require('debug')('polygon:server');
const config = require('./config');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const requestHandler = app.getRequestHandler();

// Remove previous socket if exists
try {
    fs.unlinkSync(config.httpServerSocketPath);
} catch (err) {
    if (err.code !== 'ENOENT') {
        throw err;
    }
}

app.prepare().then(() => {
    http.createServer((req, res) => {
        const parsedURL = url.parse(req.url, true);
        requestHandler(req, res, parsedURL);
    }).listen(config.httpServerSocketPath, (err) => {
        if (err) {
            throw err;
        }
        serverDebug(`Server listening on path \`${config.httpServerSocketPath}\``);
    });
});
