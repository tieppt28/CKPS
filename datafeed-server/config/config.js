const configDebug = {
    redis: {
        main: 'redis://localhost:6379',
        trading: 'redis://localhost:6379',
        cs: 'redis://localhost:6379',
    },
    provider: {
        vs: 'https://api2.vietstock.vn/Finbox/history?'
    }
};

module.exports = configDebug;
