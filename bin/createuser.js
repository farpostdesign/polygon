/**
 * Sript to add user into database
 *
 */

require('../services/db');
const User = require('../app/models/user');
const debug = require('debug')('polygon:createuser');

const email = process.argv[2];
const password = process.argv[3];
const messagingProvider = process.argv[4];
const messagingAccount = process.argv[5];

const handler = (docOrErr) => {
    debug(docOrErr);
    process.exit();
};

const newUser = new User({ email, messagingProvider, messagingAccount });
newUser.setPassword(password).then((doc) => {
    return doc.save();
}).then(handler).catch(handler);
