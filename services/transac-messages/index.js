/**
 * Sending transactional messages
 *
 * Sending messages via a plugable provider
 * object to the user/visitors of the app.
 *
 * Example:
 *
 *      const user = User.find({ email: req.body.email });
 *      const message = MagicLink.new(user);
 *      TransactionalMessages.send(user, message);
 *
 */

const Message = require('./Message');
const path = require('path');

/**
 * Construct a template name
 *
 * @param {String} templatesDir - path of template dir relatively to app dir
 * @param {String} messageName - name of a message
 * @return {String} template name
 */
function templateName(templateDir, messageName) {
    let path = `${messageName}`;
    if (templateDir) {
        path = `${templateDir}/${path}`;
    }
    return path;
}

class Messanger {
    constructor(config = {}) {
        this.providers = [];
        this.hooks = [];
        this.templatesDir = config.templatesDir && path.resolve(config.templatesDir);
    }

    /**
     * Add provider
     *
     * @param {String} providerName - name of the provider
     * @param {Function} send - function which send a message
     * @return {self}
     */
    registerProvider(providerName, send) {
        this.providers.push(providerName);
        const sendWithHooks = (message) => {
            this.hooks.forEach((hook) => hook(message));
            return send(message);
        };
        this[providerName] = (messageName, messageLocals) => {
            return new Message(
                sendWithHooks,
                templateName(this.templatesDir, messageName),
                messageLocals
            );
        };
        return this;
    }

    /**
     * Add before send hook
     *
     * @param {Function} hook - hook function to be called befor sending message
     * @return {Self}
     */
    registerHook(hook) {
        this.hooks.push(hook);
        return this;
    }

    /**
     * Remove registered provider
     *
     * @param {String} name - name of the provider
     * @return {self}
     */
    removeProvider(name) {
        if (this.providers.includes(name)) {
            Reflect.deleteProperty(this, name);
            this.providers = this.providers.filter((key) => key !== name);
        }
        return this;
    }

    /**
     * Reset configuration
     *
     * @return {self}
     */
    reset() {
        this.providers.forEach((name) => {
            this.removeProvider(name);
        });
        return this;
    }
}

module.exports = Messanger;
