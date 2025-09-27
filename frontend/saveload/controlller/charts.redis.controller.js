const redisCreate = require('../scripts/utilities/redis-create');
const client = redisCreate.redisCreateClient();
client.on('error', function(err){
});
const KEY_CHART_USER = "charts:user:";

function getKeySymbol (symbol) {
    return KEY_CHART_USER + symbol;
}


exports.saveChartTickerUser = function (ticker, userid, chartObject, version, callback) {
    const keyTickerChartUser = getKeySymbol(userid);
    let redisKey = keyTickerChartUser;
    if (typeof version === 'string' && version.length > 0) {
        redisKey += `_${version}`;
    }
    client.hset(redisKey, ticker, JSON.stringify(chartObject), function (err, data) {
        if (err) {
            return callback(false);
        }
        return callback(true);
    })
};

exports.removeChartTickerUser = function (chartId, userid, version, callback) {
    const keyTickerChartUser = getKeySymbol(userid);
    let redisKey = keyTickerChartUser;
    if (typeof version === 'string' && version.length > 0) {
        redisKey += `_${version}`;
    }
    client.hdel(redisKey, chartId, function (err, data) {
        if (err) {
            return callback(false);
        }
        return callback(true);
    })
};

exports.loadChartTickerUser = function (ticker, userid, version, callback) {
    const keyTickerChartUser = getKeySymbol(userid);
    if (ticker == 'MINICHART') {
        return callback({success: false});
    } else {
        let redisKey = keyTickerChartUser;
        if (typeof version === 'string' && version.length > 0) {
            redisKey += `_${version}`;
        }
        client.hget(redisKey, ticker, function (err, data) {
            if (err || !data || data === null) {
                return callback({success: false});
            }
            return callback({success: true, data: data});
        })
    }
};

exports.resetDefaultChartTickerUser = function (ticker, userid, version, callback) {
    const keyTickerChartUser = getKeySymbol(userid);
    let redisKey = keyTickerChartUser;
    if (typeof version === 'string' && version.length > 0) {
        redisKey += `_${version}`;
    }
    client.hdel(redisKey, ticker, function (err, data) {
        if (err || !data || data === null) {
            return callback({success: false});
        }
        return callback({success: true});
    })
};