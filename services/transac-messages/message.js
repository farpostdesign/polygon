const ejs = require('ejs');

function renderTemplate(renderer, path, locals) {
    const opts = { 'async': true };
    return renderer.renderFile(path, locals, opts);
}

class Message {
    constructor(provider, template, locals = {}, renderer = ejs) {
        this.provider = provider;
        this.template = template;
        this.locals = locals;
        this.subject = locals.subject;
        this.recipient = locals.recipient;
        this.renderer = renderer;
    }

    /**
     * Render text message
     * @return {Promise} string of rendered template
     */
    text() {
        const path = `${this.template}.text`;
        return renderTemplate(this.renderer, path, this.locals);
    }

    /**
     * Render HTML message
     * @return {Promise} string of rendered template
     */
    html() {
        const path = `${this.template}.html`;
        return renderTemplate(this.renderer, path, this.locals);
    }

    /**
     * Send this message
     * @return {Promise} result of sending the message via provider
     */
    send() {
        return this.provider(this);
    }
}

module.exports = Message;
