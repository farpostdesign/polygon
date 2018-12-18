require('isomorphic-unfetch');
const sendGridMailer = require('@sendgrid/mail');
const Messenger = require('./transac-messages');
const config = require('../config');

const messenger = new Messenger({ templatesDir: 'app/templates/messages' });

/**
 * MatterMost configuration
 *
 */

async function mattermostProvider(message) {
    const username = 'polygon.farpost.com';
    const text = await message.text();

    return fetch(config.mattermostURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, username, channel: message.recipient })
    });
}
messenger.registerProvider('Mattermost', mattermostProvider);

/**
 * Mailer configuration
 *
 */

sendGridMailer.setApiKey(config.sendGridAPIKey);

async function sendGridProvider(message) {
    const text = await message.text();
    const html = await message.html();

    const mail = {
        to: message.recipient,
        from: config.mailFrom,
        subject: message.subject,
        text,
        html
    };
    return sendGridMailer.send(mail);
}
messenger.registerProvider('Mail', sendGridProvider);

/**
 * Send application transactional message
 *
 * @param {User} user - an instance of user model
 * @param {String} messageName - an instance of user model
 * @param {Object} args - arguments to message
 * @return {Promise}
 */
function send(user, messageName, args) {
    if (!user) {
        throw new TypeError('Missing argument `user`');
    }
    if (!messageName) {
        throw new TypeError('Missing argument `messageName`');
    }
    if (!args.subject) {
        throw new TypeError('Missing `subject` property in `args` argument');
    }

    const { messagingProvider } = user;
    if (!messagingProvider) {
        throw new TypeError('User has no `messagingProvider` property');
    }

    const provider = messenger[messagingProvider];
    if (!provider) {
        throw new TypeError(`Provider \`${messagingProvider}\` not found`);
    }

    args.recipient = user.messagingAccount;

    return provider(messageName, args).send();
}

module.exports = {
    send,
    messenger
};
