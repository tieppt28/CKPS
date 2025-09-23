const Redis = require('redis');
const config = require('../config/config');
const https = require('https');

const redis = Redis.createClient({url: config.redis.trading});
redis.on('error', () => {
});

module.exports = async function (symbol) {
    if (!symbol || symbol === "") {
        symbol = "VNINDEX";
    }
    const from = (new Date().getTime() / 86400 / 1000 >> 0) * 86400 + 5400;
    const to = from + 25200;
    return {
        vs: await checkVs(symbol, from, to),
        fb: await checkFb(symbol, from, to),
    };
}

async function checkVs(symbol, from, to) {
    let providerUrl = config.provider.vs + 'resolution=1&from=' + from + '&to=' + to + '&symbol=' + symbol;
    let resp = await doRequest(providerUrl);
    let result = JSON.parse(resp);
    if (!result) {
        return {};
    }
    let tArr = result['t'];
    if (!Array.isArray(tArr) || tArr.length === 0) {
        return {};
    }
    let lastI = tArr.length - 1;
    return {
        time: formatDate(tArr[lastI]),
        close: result['c'][lastI]
    }
}

async function checkFb(symbol, from, to) {
    await redis.connect();
    let dataTimes = [];
    for (let i = from; i <= to; i += 60) {
        dataTimes.push("" + i)
    }
    let data = await redis.HMGET('trading:data:' + symbol + ':1', dataTimes);
    let result = {};
    if (Array.isArray(data) || data.length > 0) {
        for (let dataTick of data.reverse()) {
            if (dataTick === null) {
                continue;
            }
            dataTick = JSON.parse(dataTick);
            result = {
                time: formatDate(dataTick['t']),
                close: dataTick['c']
            }
            break;
        }
    }

    await redis.quit();
    return result;
}

/**
 * Send get request
 * @return {Promise} a promise of request
 */
function doRequest(url) {
    return new Promise((resolve, reject) => {
        let options = {};
        https.get(url, options, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                resolve(responseBody);
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

function formatDate(timestamp) {
    return new Date((timestamp + 25200) * 1000).toISOString().slice(0, -1) + '+07:00';
}
