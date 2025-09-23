const Redis = require('redis');
const config = require('../config/config');

const client = Redis.createClient({url: config.redis.trading});
client.on('error', () => {
});
client.connect().then(() => {
    console.log('Redis trading connected');
}).catch((err) => {
    console.error('Redis trading connect error', err);
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

    // Hỗ trợ cả 'd' (TradingView gửi 'D' và đã toLowerCase ở router)
    if (resolution === '1d' || resolution === 'd') {
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
    const isAllNull = Array.isArray(data) && data.length > 0 && data.every((v) => v === null);
    if (!data || !data.length || isAllNull) {
        try { console.log('[history] redis miss -> fallback VNDIRECT', { symbol, resolution, from: startTime, to: endTime }); } catch (e) {}
        // Fallback trực tiếp: gọi VNDIRECT khi Redis không có dữ liệu
        try {
            const request = require('request');
            const vndRes = (resolution === 'd' || resolution === '1d') ? 'D' : resolution;
            const vndUrl = `https://dchart-api.vndirect.com.vn/dchart/history?symbol=${encodeURIComponent(symbol)}&resolution=${encodeURIComponent(vndRes)}&from=${startTime}&to=${endTime}`;
            console.log('[history] VNDIRECT URL:', vndUrl);
            const vd = await new Promise((resolve, reject) => {
                request({
                    url: vndUrl,
                    method: 'GET',
                    timeout: 15000,
                    gzip: true,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
                        'Accept': 'application/json,text/plain,*/*',
                    }
                }, (err, resp, body) => {
                    if (err) return reject(err);
                    try {
                        resolve(JSON.parse(body || '{}'));
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            console.log('[history] VNDIRECT resp keys:', vd && Object.keys(vd));
            if (vd && Array.isArray(vd.t)) {
                return {
                    t: vd.t || [],
                    c: vd.c || [],
                    o: vd.o || [],
                    h: vd.h || [],
                    l: vd.l || [],
                    v: vd.v || [],
                    s: vd.s || (vd.t && vd.t.length ? 'ok' : 'no_data')
                };
            }
        } catch (e) {
            console.error('history vndirect fallback error', e);
        }
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
