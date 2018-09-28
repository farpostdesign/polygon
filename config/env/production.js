const path = require('path');

module.exports = {
    serverListenTo: path.resolve('./tmp/sockets/polygon.sock'),
    mongooseConnection: 'mongodb://db::27017/polygon'
};
