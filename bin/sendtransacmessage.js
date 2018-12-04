/**
 * This script is intended to make checks, debug and make UAT
 * of transactional messages
 *
 */

const { send } = require('../services/transac-message');
const debug = require('debug')('polygon:sendtransacmessage');

const DEFAULT_PROVIDER = 'SendGrid';

const email = process.argv[3];
const preferedMessageProvider = process.argv[4] || DEFAULT_PROVIDER;

if (!email) {
    debug('Pass an email argument as the first argument to this script');
    process.exit(1);
}

const handler = (docOrErr) => {
    if (docOrErr.message) {
        debug(docOrErr.message);
    }
    debug(docOrErr);
    process.exit();
};

const recipient = {
    email,
    preferedMessageProvider
};

send({ to: recipient, message: 'testMessage', name: email }).then(handler).catch(handler);
