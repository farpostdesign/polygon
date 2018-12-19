const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../app/models/user');
const Viewer = require('../app/models/viewer');

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
    const modelName = jwtPayload.userType;

    switch (modelName.toLowerCase()) {
        case 'user':
            User.findById(jwtPayload.userId).then((user) => {
                if (!user) {
                    return callback(null, false);
                }
                return callback(null, user);
            }).catch(callback);
            break;

        case 'viewer':
            Viewer.findById(jwtPayload.userId).then((viewer) => {
                if (!viewer) {
                    return callback(null, false);
                }
                return callback(null, viewer);
            }).catch(callback);
            break;

        default:
            callback(null, false);
    }
}));

const jwtMiddleware = passport.authenticate('jwt', { session: false });

/**
 * Tokens
 *
 */

/**
 * API Tokens
 *
 * @param {Model} user - user or viwer model instance
 * @param {Object} opts - token options
 * @return {Promise} token string
 */
function issueToken(user, opts = {}) {
    const modelName = user.constructor.modelName;
    if (!modelName) {
        throw new Error(`Can not get modelName from \`${user.constructor.name}\` constructor`);
    }
    const id = user._id;
    if (!id) {
        throw new Error(`Can not get _id from \`${user.constructor.name}\` instance`);
    }
    const payload = { userId: id.toString(), userType: modelName.toString() };
    opts.issuer = JWT_ISSUER;
    opts.audience = JWT_AUDIENCE;
    return jwt.sign(payload, config.secret, opts);
}

/**
 * Expose
 *
 */

module.exports = {
    localMiddleware,
    jwtMiddleware,
    issueToken
};
