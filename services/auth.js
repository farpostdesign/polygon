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
    if (req && req.cookes) {
        return req.cookies['token'];
    }
    return null;
}

passport.use(new JwtStrategy({
    jwtFromRequest: extractJwtFromCookies,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    secretOrKey: config.secret
}, (jwtPayload, done) => {
    const user = { id: 'dummy user id', email: 'dummyuser@example.com' };
    done(null, user);
}));

const jwtMiddleware = passport.authenticate('jwt', { session: false });

/**
 * Tokens
 *
 */

function issueToken(user) {
    const claims = {
        id: user._id.toString(),
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE
    };
    return jwt.sign(claims, config.secret);
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
