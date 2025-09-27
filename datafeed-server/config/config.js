const REDIS = process.env.REDIS_URL || 'redis://localhost:6379';
const configDebug = {
    redis: {
        main: REDIS,
        trading: REDIS,
        cs: REDIS,
    },
    provider: {
        vs: 'https://api2.vietstock.vn/Finbox/history?'
    }
};

module.exports = configDebug;
