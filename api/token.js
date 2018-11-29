const express = require('express');
const asyncRoute = require('./async-route');
const auth = require('../services/auth');
const config = require('../config');

const router = express.Router();

/**
 * Request for API token
 *
 */

router.post('/token',
    auth.localMiddleware,
    asyncRoute(async (req, res) => {
        const token = auth.issueToken(req.user);
        res.cookie('token', token, { secure: config.secureCookie, httpOnly: true });
        res.json({ message: 'Authenticated successfully' });
    })
);

/**
 * Expose
 *
 */

module.exports = router;
