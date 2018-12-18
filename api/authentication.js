const express = require('express');
const asyncRoute = require('./async-route');
const auth = require('../services/auth');
const messaging = require('../services/messaging');
const Viewer = require('../app/models/viewer');
const config = require('../config');

const router = express.Router();
const TOKEN_COOKIE_KEY = 'token';

/**
 * Get API token
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

/**
 * Remove API token
 *
 */
router.delete('/token',
    auth.jwtMiddleware,
    asyncRoute(async (req, res) => {
        res.clearCookie(TOKEN_COOKIE_KEY);
        res.json({ message: 'Token removed successfully' });
    })
);

/**
 * Send login link
 *
 */
router.post('/loginlink', asyncRoute(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new Error('No email in request body');
    }

    const viewer = await Viewer.findOne({ email });
    if (!viewer) {
        throw new Error('User not found');
    }

    const loginLink = await auth.loginLink();
    viewer.loginLink = loginLink;
    await viewer.save();
    await messaging.sendLoginLink(viewer, { loginLink });
    res.json({ message: 'Login link has been sent' });
}));

/**
 * Expose
 *
 */

module.exports = router;
