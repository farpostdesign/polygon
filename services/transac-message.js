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

const sendGridMailer = require('@sendgrid/mail');
const config = require('../config');

sendGridMailer.setApiKey(config.sendGridAPIKey);

const MAIL_FROM = config.mailFrom;

class Register {
    constructor() {
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

function sendGridProvider(recipient, message) {
    const mail = {
        to: recipient,
        from: MAIL_FROM,
        subject: message.subject,
        text: message.text,
        html: message.html
    };
    return sendGridMailer.send(mail);
}

/**
 * Message list
 *
 */

const messagesList = new Register();

function testMessage(tvars) {
    return new Message({
        subject: 'This is test message',
        textFn: messageTextTemplate,
        htmlFn: messageHTMLTemplate,
        ...tvars
    });
}

class Message {
    constructor(opts) {
        this.subject = opts.subject;
        this.textFn = opts.textFn;
        this.htmlFn = opts.htmlFn;
        this.tvars = opts;
    }

    get text() {
        return this.textFn(this.tvars);
    }

    get html() {
        return this.htmlFn(this.tvars);
    }
}

function messageTextTemplate(tvars) {
    return `Hello, ${tvars.name}!

        this is Polygon app reaching you.`;
}

function messageHTMLTemplate(tvars) {
    return `<h1>Hello, ${tvars.name}!</h1><p>This is Polygon app reaching you.</p>`;
}

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
    if (!msg) {
        throw new Error(`Message \`${messageName}\` not found`);
    }
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

    const message = messageFactory(messageName, args);
    middlewares.forEach((mid) => mid(recipient, message));

    const provider = providersList.get(recipient.preferedMessageProvider) || providersList.default;
    return provider(recipient.email, message);
}

/**
 * Initialization
 *
 */

function init() {
    providersList.register('testProvider', testProvider);
    providersList.register('SendGrid', sendGridProvider);

    const defaultProvider = providersList.get(config.defaultMessagingProvider);
    if (!defaultProvider) {
        throw new Error(`Provider \`${config.defaultMessagingProvider}\` not found`);
    }
    providersList.default = defaultProvider;

    messagesList.register('testMessage', testMessage);
}

function resetToDefault() {
    providersList.reset();
    messagesList.reset();
    init();
}

init();

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
