const express = require('express');
const asyncRoute = require('./async-route');
const auth = require('../services/auth');
const messaging = require('../services/messaging');
const Viewer = require('../app/models/viewer');
const config = require('../config');

const router = express.Router();
const TOKEN_COOKIE_KEY = 'token';
const FIVE_MINS = 60 * 5;

/**
 * Get API token
 *
 */
router.post('/token',
    auth.localMiddleware,
    asyncRoute(async (req, res) => {
        const token = auth.issueToken(req.user);
        res.cookie(TOKEN_COOKIE_KEY, token, { secure: config.secureCookie, httpOnly: true });
        res.json({ message: 'Successful login' });
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
        res.json({ message: 'Successful logout' });
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

    const loginToken = await auth.issueToken(viewer, { expiresIn: FIVE_MINS });
    const loginLink = `${config.protocol}//${config.hostname}:${config.port}/api/loginlink/${loginToken}`;
    viewer.loginToken = loginToken;
    await viewer.save();
    await messaging.sendLoginLink(viewer, { loginLink });
    res.json({ message: 'Login link has been sent' });
}));

/**
 * Login with magic link
 *
 */
router.get('/loginlink/:loginToken', asyncRoute(async (req, res) => {
    const { loginToken } = req.params;
    await auth.verifyToken(loginToken);

    const viewer = await Viewer.findOne({ loginToken });
    if (!viewer) {
        throw new Error('Viewer not found');
    }
    viewer.loginToken = null;
    await viewer.save();

    const viewerToken = await auth.issueToken(viewer);
    res.cookie(TOKEN_COOKIE_KEY, viewerToken, { secure: config.secureCookie, httpOnly: true });

    const redirectTo = req.query.redirect || '/';
    res.redirect(redirectTo);
}));

/**
 * Expose
 *
 */

module.exports = router;
