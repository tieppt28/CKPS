const redis = require('redis');
const config = require('../../config/config');

exports.redisCreateClient = function () {
    console.log(config.redis.url);
    return redis.createClient(config.redis.url);
};
