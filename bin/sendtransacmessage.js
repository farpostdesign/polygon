/**
 * This script is intended to make checks, debug and make UAT
 * of transactional messages
 *
 */

const { send } = require('../services/messaging');
const debug = require('debug')('polygon:sendtransacmessage');

const DEFAULT_PROVIDER = 'Mattermost';

const recipient = process.argv[3];
const messagingProvider = process.argv[4] || DEFAULT_PROVIDER;

if (!recipient) {
    debug('Pass a recipient as the first argument to this script');
    process.exit(1);
}

const handler = (docOrErr) => {
    if (docOrErr.message) {
        debug(docOrErr.message);
    }
    debug(docOrErr);
    process.exit();
};

const user = {
    messagingProvider,
    messagingAccount: recipient
};

send(user, 'test', { subject: 'This is a test' }).then(handler).catch(handler);
