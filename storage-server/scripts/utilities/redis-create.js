const redis = require('redis');
const config = require('../../config/config');

exports.redisCreateClient = function () {
    return redis.createClient(config.redis.url);
};
