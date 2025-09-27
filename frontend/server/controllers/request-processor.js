/*
	This file is a node.js module.

	This is a sample implementation of UDF-compatible datafeed wrapper for Quandl (historical data) and yahoo.finance (quotes).
	Some algorithms may be incorrect because it's rather an UDF implementation sample
	then a proper datafeed implementation.
*/

/* global require */
/* global console */
/* global exports */
/* global process */

'use strict';

var version = '2.0.4';

var https = require('https');
var http = require('http');
var utilities = require('./utilities');
var request = require('request');

var quandlCache = {};
var quandlMinimumDate = '1970-01-01';

function dateFors() {
    return (new Date()).toISOString() + ': ';
}

var defaultResponseHeader = {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
};

function sendJsonResponse(response, jsonData) {
    response.writeHead(200, defaultResponseHeader);
    response.write(JSON.stringify(jsonData));
    response.end();
}

function dateToYMD(date) {
    var obj = new Date(date);
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    return year + '-' + month + '-' + day;
}

function sendError(error, response) {
    if (response.headersSent) {
        return;
    }
    response.writeHead(200, defaultResponseHeader);
    response.write('{\'s\':\'error\',\'errmsg\':\'' + error + '\'}', null, function () {
        response.end();
    });
}

function proxyRequest(controller, options, response) {
    controller.request(options, function (res) {
        var result = '';

        res.on('data', function (chunk) {
            result += chunk;
        });

        res.on('end', function () {
            if (res.statusCode !== 200) {
                response.writeHead(200, defaultResponseHeader);
                response.write(JSON.stringify({
                    s: 'error',
                    errmsg: 'Failed to get news'
                }));
                response.end();
                return;
            }
            response.writeHead(200, defaultResponseHeader);
            response.write(result);
            response.end();
        });
    }).end();
}

function RequestProcessor(symbolsDatabase) {
    this._symbolsDatabase = symbolsDatabase;
}

function filterDataPeriod(data, fromSeconds, toSeconds) {
    if (!data || !data.t) {
        return data;
    }

    if (data.t[data.t.length - 1] < fromSeconds) {
        return {
            s: 'no_data',
            nextTime: data.t[data.t.length - 1]
        };
    }

    var fromIndex = null;
    var toIndex = null;
    var times = data.t;
    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        if (fromIndex === null && time >= fromSeconds) {
            fromIndex = i;
        }
        if (toIndex === null && time >= toSeconds) {
            toIndex = time > toSeconds ? i - 1 : i;
        }
        if (fromIndex !== null && toIndex !== null) {
            break;
        }
    }

    fromIndex = fromIndex || 0;
    toIndex = toIndex ? toIndex + 1 : times.length;

    var s = data.s;

    if (toSeconds < times[0]) {
        s = 'no_data';
    }

    toIndex = Math.min(fromIndex + 1000, toIndex); // do not send more than 1000 bars for server capacity reasons

    return {
        t: data.t.slice(fromIndex, toIndex),
        o: data.o.slice(fromIndex, toIndex),
        h: data.h.slice(fromIndex, toIndex),
        l: data.l.slice(fromIndex, toIndex),
        c: data.c.slice(fromIndex, toIndex),
        v: data.v.slice(fromIndex, toIndex),
        s: s
    };
}

RequestProcessor.prototype._sendConfig = function (response) {

    const config = {
        supports_search: true,
        supports_group_request: false,
        supports_marks: true,
        supports_timescale_marks: true,
        supports_time: true,
        exchanges: [
            {
                value: '',
                name: 'All Exchanges',
                desc: ''
            },
            {
                value: 'HNX',
                name: 'HNX',
                desc: 'Sàn HNX'
            },
            {
                value: 'HOSE',
                name: 'HOSE',
                desc: 'Sàn HOSE'
            },
            {
                value: 'UPCOM',
                name: 'UPCOM',
                desc: 'Sàn UPCOM'
            },
            {
                value: 'OTHER',
                name: 'OTHER',
                desc: 'Ngành'
            },
        ],
        symbols_types: [
            {
                name: 'All types',
                value: ''
            },
            {
                name: 'Stock',
                value: 'stock'
            },
            {
                name: 'Index',
                value: 'index'
            }
        ],
        supported_resolutions: ['1', '2', '3', '5', '15', '30', '45', '60', '120', '180', '240', 'D', '2D', '3D', 'W', 'M', '6M']
    };

    response.writeHead(200, defaultResponseHeader);
    response.write(JSON.stringify(config));
    response.end();
};


const getMarks = require("./get_marks")
RequestProcessor.prototype._sendMarks = function (symbol, from, to, resolution, response) {
    getMarks(symbol, from, to, resolution).then(result => {
        response.writeHead(200, defaultResponseHeader);
        response.end(JSON.stringify(result));
    }).catch(reason => {
        sendError('data', response);
    });
};

RequestProcessor.prototype._sendTime = function (response) {
    var now = new Date();
    response.writeHead(200, defaultResponseHeader);
    response.write(Math.floor(now / 1000) + '');
    response.end();
};

RequestProcessor.prototype._sendTimescaleMarks = function (response) {
    const lastMarkTimestamp = 1522108800;
    const day = 60 * 60 * 24;

    const signalDataFromServer = [
        // {
        //     time: lastMarkTimestamp,
        //     signal: 'SMALL BUY'
        // },
        // {
        //     time: lastMarkTimestamp - 4 * day,
        //     signal: 'SMALL SELL'
        // },
        // {
        //     time: lastMarkTimestamp - 7 * day,
        //     signal: 'BIG BUY'
        // },
        // {
        //     time: lastMarkTimestamp - 10 * day,
        //     signal: 'BIG SELL'
        // }
    ];

    const marks = signalDataFromServer.map((item, index) => utilities.signalDataToTimeScaledMark(item, index));
    response.writeHead(200, defaultResponseHeader);
    response.write(JSON.stringify(marks));
    response.end();
};


RequestProcessor.prototype._sendSymbolSearchResults = function (query, type, exchange, maxRecords, response) {
    if (!maxRecords) {
        throw 'wrong_query';
    }

    var result = this._symbolsDatabase.search(query, type, exchange, maxRecords);

    response.writeHead(200, defaultResponseHeader);
    response.write(JSON.stringify(result));
    response.end();
};

RequestProcessor.prototype._prepareSymbolInfo = function (symbolName) {
    var symbolInfo = this._symbolsDatabase.symbolInfo(symbolName);

    if (!symbolInfo) {
        symbolInfo = {
            name: symbolName
        };
        // throw 'unknown_symbol ' + symbolName;
    }

    return {
        'name': symbolInfo.name || symbolName,
        'exchange-traded': symbolInfo.exchange || symbolName,
        'exchange-listed': symbolInfo.exchange || symbolName,
        'timezone': 'Asia/Ho_Chi_Minh',
        'minmov': 1,
        'minmov2': 0,
        'pointvalue': 1,
        'session': '0900-1500',
        'has_intraday': true,
        'has_daily': true,
        'has_weekly_and_monthly': false,
        // 'has_no_volume': symbolInfo.type !== 'stock',
		'visible_plots_set': ['ohlc'],
        'description': symbolInfo.description.length > 0 ? symbolInfo.description : symbolInfo.name,
        'type': symbolInfo.type,
        'intraday_multipliers': ['1', 'D'],
        'pricescale': 100,
        'ticker': symbolInfo.name.toUpperCase()
    };
};

RequestProcessor.prototype._sendSymbolInfo = function (symbolName, response) {
    var info = this._prepareSymbolInfo(symbolName);

    response.writeHead(200, defaultResponseHeader);
    response.write(JSON.stringify(info));
    response.end();
};

const getHistory = require("./history")
RequestProcessor.prototype._sendSymbolHistory = function (symbol, startDateTimestamp, endDateTimestamp, lastTimeTimestamp, resolution, response) {
    function sendResult(content) {
        if (response.headersSent) {
            return;
        }
        var header = Object.assign({}, defaultResponseHeader);
        header['Content-Length'] = content.length;
        response.writeHead(200, header);
        response.write(content, null, function () {
            response.end();
        });
    }

    // get data symbol from redis
    getHistory(symbol, resolution, startDateTimestamp, endDateTimestamp, lastTimeTimestamp).then(result => {
        sendResult(JSON.stringify(result));
    }).catch(reason => {
        sendError('data', response);
    });
};

RequestProcessor.prototype._quotesQuandlWorkaround = function (tickersMap) {
    var from = quandlMinimumDate;
    var to = dateToYMD(Date.now());

    var result = {
        s: 'ok',
        d: [],
        source: 'Finbox',
    };

    Object.keys(tickersMap).forEach(function (symbol) {
        var key = symbol + '|' + from + '|' + to;
        var ticker = tickersMap[symbol];

        var data = quandlCache[key];
        var length = data === undefined ? 0 : data.c.length;

        if (length > 0) {
            var lastBar = {
                o: data.o[length - 1],
                h: data.o[length - 1],
                l: data.o[length - 1],
                c: data.o[length - 1],
                v: data.o[length - 1],
            };

            result.d.push({
                s: 'ok',
                n: ticker,
                v: {
                    ch: 0,
                    chp: 0,

                    short_name: symbol,
                    exchange: '',
                    original_name: ticker,
                    description: ticker,

                    lp: lastBar.c,
                    ask: lastBar.c,
                    bid: lastBar.c,

                    open_price: lastBar.o,
                    high_price: lastBar.h,
                    low_price: lastBar.l,
                    prev_close_price: length > 1 ? data.c[length - 2] : lastBar.o,
                    volume: lastBar.v,
                }
            });
        }
    });

    return result;
};

RequestProcessor.prototype._sendQuotes = function (tickersString, response) {
    var tickersMap = {}; // maps YQL symbol to ticker

    var tickers = tickersString.split(',');
    [].concat(tickers).forEach(function (ticker) {
        var yqlSymbol = ticker.replace(/.*:(.*)/, '$1');
        tickersMap[yqlSymbol] = ticker;
    });

    sendJsonResponse(response, this._quotesQuandlWorkaround(tickersMap));
};

RequestProcessor.prototype._sendNews = function (symbol, response) {
    var options = {
        host: 'feeds.finance.yahoo.com',
        path: '/rss/2.0/headline?s=' + symbol + '&region=US&lang=en-US'
    };

    proxyRequest(https, options, response);
};

RequestProcessor.prototype._sendFuturesmag = function (response) {
    var options = {
        host: 'www.oilprice.com',
        path: '/rss/main'
    };

    proxyRequest(http, options, response);
};

const checkStatus = require("./check_status")
RequestProcessor.prototype._checkStatus = function (symbol, response) {
    // get data symbol from redis
    checkStatus(symbol).then(result => {
        response.writeHead(200, defaultResponseHeader);
        response.end(JSON.stringify(result, null, 2));
    }).catch(reason => {
        sendError(reason, response);
    });
};

RequestProcessor.prototype.processRequest = function (action, query, response) {
    try {
        if (action === '/config') {
            this._sendConfig(response);
        } else if (action === '/symbols' && !!query['symbol']) {
            this._sendSymbolInfo(query['symbol'], response);
        } else if (action === '/search') {
            this._sendSymbolSearchResults(query['query'], query['type'], query['exchange'], query['limit'], response);
        } else if (action === '/history') {
            this._sendSymbolHistory(query['symbol'], query['from'], query['to'], query['lastTime'], query['resolution'].toLowerCase(), response);
        } else if (action === '/quotes') {
            this._sendQuotes(query['symbols'], response);
        } else if (action === '/marks') {
            this._sendMarks(query['symbol'], query['from'], query['to'], query['resolution'].toLowerCase(), response);
        } else if (action === '/time') {
            this._sendTime(response);
        } else if (action === '/timescale_marks') {
            this._sendTimescaleMarks(response);
        } else if (action === '/news') {
            this._sendNews(query['symbol'], response);
        } else if (action === '/futuresmag') {
            this._sendFuturesmag(response);
        } else if (action === '/status') {
            this._checkStatus(query['symbol'], response);
        } else {
            response.writeHead(200, defaultResponseHeader);
            response.write('Datafeed version is ' + version + '. Finbox @2023');
            response.end();
        }
    } catch (error) {
        sendError(error, response);
    }
};

exports.RequestProcessor = RequestProcessor;
