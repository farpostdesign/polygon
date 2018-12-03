/**
 * Transactional messages on Polygon.
 *
 * Sending messages via a plugable provider
 * object to the user/visitors of the app.
 *
 * Example:
 *
 *      const user = User.find({ email: req.body.email });
 *      const message = MaginLink.new(user);
 *      TransactionalMessages.send(user, message);
 *
 */

const config = require('../config');

class Register {
    construcor() {
        this.list = {};
    }

    get(name) {
        return this.list[name];
    }

    register(name, entity) {
        this.list[name] = entity;
    }

    reset() {
        this.list = {};
    }
}

/**
 * Providers list
 *
 */

const providersList = new Register();

function testProvider() {
    // do nothing
}

/**
 * Message list
 *
 */

const messagesList = new Register();

/**
 * Middlewares
 *
 */

const middlewares = [];

function registerMiddleware(fn) {
    middlewares.push(fn);
}

/**
 * Build message by message identifyer
 *
 */
function messageFactory(messageName, options) {
    const msg = messagesList.get(messageName);
    return new msg(options);
}


/**
 * Send transactional message
 *
 * @return {Promise}
 */
function send(args) {
    const recipient = args.to;
    if (!recipient) {
        throw new TypeError('Missing argument `to`');
    }

    const messageName = args.message;
    if (!recipient) {
        throw new TypeError('Missing argument `message`');
    }

    const message = messageFactory(messageName);
    middlewares.forEach((mid) => mid(recipient, message));

    const provider = providersList.get(recipient.preferedMessageProvider) || providersList.default;
    return provider(recipient, message);
}

/**
 * Initialization
 *
 */

function init() {
    providersList.register('testProvider', testProvider);

    const defaultProvider = providersList.get(config.defaultMessagingProvider);
    if (!defaultProvider) {
        throw new Error(`Provider \`${config.defaultMessagingProvider}\` not found`);
    }
    providersList.default = defaultProvider;
}

function resetToDefault() {
    providersList.reset();
    messagesList.reset();
    init();
}

/**
 * Expose
 *
 */

module.exports = {
    use: registerMiddleware,
    resetToDefault,
    providersList,
    messagesList,
    send
};
