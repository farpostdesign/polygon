/**
 * Sript to add user into database
 *
 */

require('../services/db');
const Viewer = require('../app/models/viewer');
const debug = require('debug')('polygon:createviewer');

const email = process.argv[2];
const messagingProvider = process.argv[3];
const messagingAccount = process.argv[4];

const handler = (docOrErr) => {
    debug(docOrErr);
    process.exit();
};

Viewer.create({ email, messagingProvider, messagingAccount }).then(handler).catch(handler);
