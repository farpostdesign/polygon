const serverListenTo = 3333;

module.exports = {
    serverListenTo,
    mongooseConnection: 'mongodb://localhost:27017/polygon-test',
    secret: 'testsecret',
    secureCookie: false,
    host: `polygon-test.localhost:${serverListenTo}`,
    protocol: 'https:',
    hostname: 'polygon-test.localhost',
    port: serverListenTo,
    tokenSize: 8
};
