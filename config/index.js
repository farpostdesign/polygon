const development = require('./env/development');
const production = require('./env/production');

const environments = {
    development,
    production
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

config.uploadsDir =  'uploads';

/**
 * Environment booleans
 *
 */

config.production = env === 'production';
config.development = env === 'development';

module.exports = config;
