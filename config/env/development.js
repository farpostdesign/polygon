const serverListenTo = 3000;

module.exports = {
    serverListenTo,
    mongooseConnection: 'mongodb://localhost:27017/polygon',
    secret: 'devsecret',
    secureCookie: false,
    host: `localhost:${serverListenTo}`,
    protocol: 'http:',
    hostname: 'localhost',
    port: serverListenTo,
    tokenSize: 64
};
