const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../app/models/user');

const JWT_ISSUER = config.host;
const JWT_AUDIENCE = config.host;

/**
 * Local Auth
 *
 */

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, User.authenticate()));

const localMiddleware = passport.authenticate('local', {
    session: false,
    failWithError: true
});

/**
 * JWT auth
 *
 */

function extractJwtFromCookies(req) {
    if (req && req.cookies) {
        return req.cookies['token'];
    }
    return null;
}

passport.use(new JwtStrategy({
    jwtFromRequest: extractJwtFromCookies,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    secretOrKey: config.secret
}, (jwtPayload, callback) => {
    User.findById(jwtPayload.userId).then((user) => {
        if (!user) {
            return callback(null, false);
        }
        return callback(null, user);
    }).catch(callback);
}));

const jwtMiddleware = passport.authenticate('jwt', { session: false });

/**
 * Tokens
 *
 */

/**
 * API Tokens
 *
 * @return {Promise} token string
 */
function issueToken(user) {
    const payload = { userId: user._id.toString() };
    const opts = {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE
    };
    return jwt.sign(payload, config.secret, opts);
}

/**
 * Login Token
 *
 * used to aquire view token
 */
function issueLoginToken(callback) {
    crypto.randomBytes(config.tokenSize, (err, buf) => {
        if (err) {
            throw err;
        }
        callback(buf.toString('hex'));
    });
}

/**
 * Make a login link
 *
 */
function loginLink() {
    return new Promise((resolve, reject) => {
        try {
            issueLoginToken((token) => {
                resolve(`${config.protocol}//${config.hostname}:${config.port}/what-it-will-be?logintoken=${token}`);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Expose
 *
 */

module.exports = {
    localMiddleware,
    jwtMiddleware,
    issueToken,
    loginLink
};
