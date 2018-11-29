const express = require('express');
const asyncRoute = require('./async-route');
const auth = require('../services/auth');
const config = require('../config');

const router = express.Router();
const TOKEN_COOKIE_KEY = 'token';

/**
 * Request for API token
 *
 */

router.post('/token',
    auth.localMiddleware,
    asyncRoute(async (req, res) => {
        const token = auth.issueToken(req.user);
        res.cookie(TOKEN_COOKIE_KEY, token, { secure: config.secureCookie, httpOnly: true });
        res.json({ message: 'Authenticated successfully' });
    })
);

router.delete('/token',
    auth.jwtMiddleware,
    asyncRoute(async (req, res) => {
        res.clearCookie(TOKEN_COOKIE_KEY);
        res.json({ message: 'Token removed successfully' });
    })
);

/**
 * Expose
 *
 */

module.exports = router;
