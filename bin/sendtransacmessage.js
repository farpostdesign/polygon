/**
 * This script is intended to make checks, debug and make UAT
 * of transactional messages
 *
 */

const { send } = require('../services/transac-message');
const debug = require('debug')('polygon:sendtransacmessage');

const DEFAULT_PROVIDER = 'SendGrid';

const channel = process.argv[3];
const preferedMessageProvider = process.argv[4] || DEFAULT_PROVIDER;

if (!channel) {
    debug('Pass a channel as the first argument to this script');
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
    email: channel,
    preferedMessageProvider
};

send({ to: recipient, message: 'testMessage', name: 'Dear friend' }).then(handler).catch(handler);
