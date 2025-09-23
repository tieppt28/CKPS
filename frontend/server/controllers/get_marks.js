const Redis = require('redis');
const config = require('../config/config');

const redis = Redis.createClient({url: config.redis.main});
redis.on('error', () => {
});
redis.connect().then(() => {
    console.log('Redis base connected');
}).catch((err) => {
    console.error('Redis base connect error', err);
});

const csRedis = Redis.createClient({url: config.redis.cs});
csRedis.on('error', () => {
});
csRedis.connect().then(() => {
    console.log('Redis CS connected');
}).catch((err) => {
    console.error('Redis CS connect error', err);
});

module.exports = async function (symbol, from, to, resolution) {
    if (symbol === 'VN30F1M' && resolution === '1') {
        return getPsMarks();
    } else if (resolution.endsWith('d')) {
        return getCsMarks(symbol);
    }
    return [];
}

async function getCsMarks(symbol) {
    const rawAll = await csRedis.HGETALL(`core_cs:signal#${symbol}`);
    const signals = Object.entries(rawAll).map(([ts, raw]) => {
        const data = JSON.parse(raw)
        let signal = data['signal'];
        let text, label, size, color, labelFontColor;
        if (signal === 'BIG BUY') {
            text = 'BIG BUY';
            label = 'B';
            size = 24;
            labelFontColor = 'white';
            color = 'green';
        } else if (signal === 'SMALL BUY') {
            text = 'SMALL BUY';
            label = 'B';
            size = 16;
            labelFontColor = 'white';
            color = 'green';
        } else if (signal === 'BIG SELL') {
            text = 'BIG SELL';
            label = 'S';
            size = 24;
            labelFontColor = 'white';
            color = 'red';
        } else if (signal === 'SMALL SELL') {
            text = 'SMALL SELL';
            label = 'S';
            size = 16;
            labelFontColor = 'white';
            color = 'red';
        } else if (!!data['pullback_20_price']) {
            text = 'PULLBACK';
            label = 'P';
            size = 16;
            labelFontColor = 'white';
            color = 'orange';
        } else if (!!data['pullback_10_price']) {
            text = 'PULLBACK 10';
            label = 'P';
            size = 16;
            labelFontColor = 'white';
            color = 'orange';
        } else {
            return null;
        }

        return {
            id: data['date'],
            time: +ts,
            text: text,
            label: label,
            minSize: size,
            pattern: 0,
            labelFontColor: labelFontColor,
            color: color
        };
    }).filter(s => !!s).sort((a, b) => b.time - a.time);
    return signals;
}

async function getPsMarks() {
    let rawArray = await redis.ZRANGE('ticker_trade:record_show:trend_trading:order_income', -20, -1);
    let result = [];
    for (let raw of rawArray.reverse()) {
        let data = JSON.parse(raw);
        let signal = data['orderTrendTrading']
        let ls = signal === 'Long' ? true : signal === 'Short' ? false : undefined;
        if (ls === undefined) {
            continue;
        }

        let date = data['rawDate'];
        let timestamp = data['rawT'];
        let text, label, size;
        if (ls) {
            text = 'Long';
            label = 'L';
            size = 16;
        } else {
            text = 'Short';
            label = 'S';
            size = 16;
        }
        result.push({
            id: date,
            time: timestamp,
            text: text,
            label: label,
            minSize: size,
            pattern: 0
        });
        break;
    }
    return result;
}
