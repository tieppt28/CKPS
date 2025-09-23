const configDebug = {
    env: 'development',
    mongo: {
        host:'mongodb://mongo:27017/chart-finbox',
        // host:'mongodb://localhost:27017/chart-finbox',
        port: 27017
    },
    redis: {
        // url: 'redis://:142bcb9f41fe2f16d7279b748a59e78738f371fb08a612e3d604a00ced0e1f73@103.7.43.54:6379'
        url: 'redis://:Finbox@123@redis:6379'
    }
};

module.exports = configDebug;