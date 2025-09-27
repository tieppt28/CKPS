const Redis = require('redis');
const config = require('../config/config');

const client = Redis.createClient({url: config.redis.trading});
client.on('error', () => {
});
client.connect().then(() => {
}).catch((err) => {
});

// Tính RSI theo công thức chuẩn
function calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return null;
    
    const changes = [];
    for (let i = 1; i < prices.length; i++) {
        changes.push(prices[i] - prices[i - 1]);
    }
    
    const gains = changes.map(change => change > 0 ? change : 0);
    const losses = changes.map(change => change < 0 ? -change : 0);
    
    // Initial average (SMA)
    let avgGain = 0, avgLoss = 0;
    for (let i = 0; i < period; i++) {
        avgGain += gains[i];
        avgLoss += losses[i];
    }
    avgGain /= period;
    avgLoss /= period;
    
    // Wilder's smoothing
    for (let i = period; i < gains.length; i++) {
        avgGain = (avgGain * (period - 1) + gains[i]) / period;
        avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    }
    
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    
    return Math.max(0, Math.min(100, rsi));
}

module.exports = async function (symbol, indicator, timestamp) {
    try {
        // Lấy dữ liệu giá từ Redis
        const dataKey = 'trading:data:' + symbol + ':1';
        const data = await client.get(dataKey);
        
        if (!data) {
            return null;
        }
        
        const parsedData = JSON.parse(data);
        if (!parsedData.c || parsedData.c.length === 0) {
            return null;
        }
        
        const closes = parsedData.c;
        const times = parsedData.t || [];
        
        // Tìm index gần nhất với timestamp
        let closestIndex = -1;
        let minDiff = Infinity;
        
        
        for (let i = 0; i < times.length; i++) {
            const diff = Math.abs(times[i] - timestamp);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        }
        
        
        if (closestIndex === -1 || closestIndex < 14) {
            return null;
        }
        
        // Tính RSI với dữ liệu từ đầu đến thời điểm gần nhất
        const pricesForRsi = closes.slice(0, closestIndex + 1);
        const rsi = calculateRSI(pricesForRsi, 14);
        
        
        return {
            rsi: rsi,
            timestamp: timestamp,
            symbol: symbol
        };
        
    } catch (error) {
        return null;
    }
};
