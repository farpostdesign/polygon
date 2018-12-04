const development = require('./env/development');
const production = require('./env/production');
const test = require('./env/test');

const environments = {
    development,
    production,
    test
};

const DEFAULT_ENVIRONMENT = 'development';
const env = process.env.NODE_ENV || DEFAULT_ENVIRONMENT;
const config = environments[env];

if (!config) {
    throw new Error(`Config not found for environment \`${env}\``);
}

/**
 * General configuration
 *
 */

config.publicDir = 'public';
config.uploadsDir = 'uploads';
config.sendGridAPIKey = process.env.SENDGRID_API_KEY;
config.mailFrom = 'no-reply@polygon.farpost.com';

/**
 * Environment booleans
 *
 */

config.production = env === 'production';
config.development = env === 'development';

module.exports = config;
