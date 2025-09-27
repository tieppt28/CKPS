const Redis = require('redis');
const config = require('../config/config');

const client = Redis.createClient({url: config.redis.trading});
client.on('error', () => {
});
client.connect().then(() => {
}).catch((err) => {
});

module.exports = async function (symbol, resolution, startTime, endTime, lastTime) {
    let symbolData = {
        t: [],
        c: [],
        o: [],
        h: [],
        l: [],
        v: [],
        s: 'ok'
    };
    let dataKey, dataTimes;

    if (resolution === '1d') {
        dataKey = 'trading:data:' + symbol + ':D';
        dataTimes = prepareTimes(startTime, endTime, 86400);
    } else if (resolution === '1') {
        dataKey = 'trading:data:' + symbol + ':1';
        dataTimes = prepareTimes(startTime, endTime, 60);
    }
    if (dataTimes === undefined || dataTimes.length === 0 || dataTimes[0] === '0') {
        return symbolData;
    }
    let data = await client.HMGET(dataKey, dataTimes);
    if (!data || !data.length) {
        return symbolData;
    }
    for (let dataDay of data) {
        if (dataDay === null) {
            continue;
        }
        dataDay = JSON.parse(dataDay);
        symbolData.t.push(dataDay['t']);
        symbolData.c.push(dataDay['c']);
        symbolData.o.push(dataDay['o']);
        symbolData.h.push(dataDay['h']);
        symbolData.l.push(dataDay['l']);
        symbolData.v.push(dataDay['v']);
    }

    if (symbolData.t.length === 0) {
        symbolData.s = "no_data";
    }
    return symbolData;
};

function prepareTimes(startTime, endTime, resolution) {
    let from = +startTime || 0;
    let to = +endTime || 0;

    // Sửa lỗi không lấy được data khi mã list sàn
    from -= 10 * 86400 // Lấy thêm cây nến 12 ngày tiếp theo để tránh thời gian nghỉ giao dịch quá dài

    let times = [];
    let t = (~~((from - 1) / resolution) + 1) * resolution;
    while (t <= to) {
        times.push('' + t);
        t += resolution;
    }

    return times;
}
