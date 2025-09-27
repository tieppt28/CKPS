const configDebug = {
    env: process.env.NODE_ENV || 'development',
    mongo: {
        host: process.env.MONGODB_URI || 'mongodb://mongo:27017/chart-finbox',
        port: 27017
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://redis:6379'
    }
};

module.exports = configDebug;