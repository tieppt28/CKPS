const configDebug = {
    env: 'development',
    mongo: {
        // Ưu tiên biến môi trường khi chạy ngoài Docker; mặc định dùng localhost
        host: process.env.MONGO_URI || 'mongodb://localhost:27017/chart-finbox',
        port: 27017
    },
    redis: {
        // Ưu tiên biến môi trường khi chạy ngoài Docker; mặc định dùng localhost
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    }
};

module.exports = configDebug;