const path = require('path');

/**
 * Environment vairables
 *
 */

const secret = process.env.POLYGON_SECRET;

module.exports = {
    serverListenTo: path.resolve('./tmp/sockets/polygon.sock'),
    mongooseConnection: 'mongodb://db::27017/polygon',
    secret,
    secureCookie: true,
    host: 'polygon.farpost.com',
    protocol: 'http:',
    hostname: 'polygon.farpost.com',
    port: 80
};
