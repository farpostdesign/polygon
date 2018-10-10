const mongoose = require('mongoose');
const config = require('../config');

function errHandler(err) {
    throw new Error(err);
}

mongoose.connect(config.mongooseConnection).catch(errHandler);
