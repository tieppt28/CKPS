package stockprediction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stockprediction.entity.StockDataEntity;
import stockprediction.indicators.TechnicalIndicators;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.time.Instant;
import java.time.ZoneId;
import org.springframework.web.client.RestTemplate;

@Service
public class TrendForecastService {

    @Autowired
    private StockDataService stockDataService;

    public Map<String, Object> forecastShortTerm(String symbol, int horizonDays) {
        Map<String, Object> result = new HashMap<>();
        result.put("symbol", symbol);
        result.put("horizonDays", horizonDays);

        // Lấy dữ liệu thực tế từ VNDIRECT API
        List<StockDataEntity> entities = getRealStockData(symbol);
        if (entities == null || entities.size() < 50) {
            result.put("confidence", 0.0);
            result.put("direction", "NEUTRAL");
            result.put("summary", "Không đủ dữ liệu để dự báo");
            return result;
        }

        // Chuyển đổi sang dữ liệu chỉ cần thiết (close)
        var data = stockDataService.convertToStockDataList(entities);

        var ema20 = TechnicalIndicators.calculateEMA(data, 20);
        var ema50 = TechnicalIndicators.calculateEMA(data, 50);
        var macdRes = TechnicalIndicators.calculateMACD(data, 12, 26, 9);
        var rsiList = TechnicalIndicators.calculateRSI(data, 14);

        int last = data.size() - 1;
        double lastClose = data.get(last).getClose();
        double lastEma20 = ema20.get(last);
        double lastEma50 = ema50.get(last);
        double macd = macdRes.getMacdLine().get(last);
        double macdSignal = macdRes.getSignalLine().get(last);
        double macdHist = macdRes.getHistogram().get(last);

        // Tính toán dự báo dựa trên phân tích kỹ thuật chuẩn
        double score = 0.0;
        double rsi = rsiList.get(last);
        
        // 1. EMA Cross (40% trọng số)
        if (lastEma20 > lastEma50) {
            score += 0.4; // Bullish cross
        } else {
            score -= 0.4; // Bearish cross
        }
        
        // 2. MACD Signal (30% trọng số)
        if (macd > macdSignal) {
            score += 0.3; // Bullish MACD
        } else {
            score -= 0.3; // Bearish MACD
        }
        
        // 3. MACD Histogram (20% trọng số)
        if (macdHist > 0) {
            score += 0.2; // Positive momentum
        } else {
            score -= 0.2; // Negative momentum
        }
        
        // 4. Price vs EMA20 (10% trọng số)
        if (lastClose > lastEma20) {
            score += 0.1; // Price above EMA20
        } else {
            score -= 0.1; // Price below EMA20
        }
        
        // 5. RSI Analysis (15% trọng số)
        if (rsi < 30) {
            score += 0.15; // Oversold - potential bounce
        } else if (rsi > 70) {
            score -= 0.15; // Overbought - potential pullback
        } else if (rsi > 50) {
            score += 0.05; // Slight bullish bias
        } else {
            score -= 0.05; // Slight bearish bias
        }

        // ATR bước tiếp (xấp xỉ): dùng biến động gần đây để mở rộng target
        double atr = calculateSimpleATR(data, 14);

        // Xác định hướng và độ tin cậy (độ tin cậy giảm khi horizon dài)
        String direction;
        double baseConfidence;
        
        if (score > 0.3) {
            direction = "UP";
            baseConfidence = Math.min(95.0, 50.0 + (score * 50.0));
        } else if (score < -0.3) {
            direction = "DOWN";
            baseConfidence = Math.min(95.0, 50.0 + (Math.abs(score) * 50.0));
        } else {
            direction = "NEUTRAL";
            baseConfidence = Math.max(15.0, 50.0 - (Math.abs(score) * 50.0));
        }
        
        // Điều chỉnh độ tin cậy dựa trên số ngày dự báo
        // Ngắn hạn: tin cậy cao, dài hạn: tin cậy thấp hơn
        double horizonFactor = Math.max(0.3, Math.min(1.0, 1.0 - (horizonDays - 1) * 0.1));
        double confidence = baseConfidence * horizonFactor;

        // Tính giá mục tiêu dựa trên ATR, xu hướng và thời gian dự báo
        double atrPercent = atr / Math.max(1e-6, lastClose);
        
        // Điều chỉnh hệ số volatility theo thời gian dự báo
        // Ngắn hạn: thay đổi nhỏ nhưng chính xác hơn
        // Dài hạn: thay đổi lớn hơn nhưng không chắc chắn
        double timeBasedFactor = 1.0 + (horizonDays - 1) * 0.3; // Tăng dần theo ngày
        double volFactor = Math.max(0.005, Math.min(0.05, atrPercent * timeBasedFactor));
        
        double target;
        if (direction.equals("UP")) {
            // Tăng theo thời gian và volatility
            target = lastClose * (1 + volFactor * Math.sqrt(horizonDays));
        } else if (direction.equals("DOWN")) {
            // Giảm theo thời gian và volatility  
            target = lastClose * (1 - volFactor * Math.sqrt(horizonDays));
        } else {
            // Neutral: dao động nhỏ quanh giá hiện tại
            double neutralMove = volFactor * horizonDays * 0.3;
            target = lastClose * (1 + neutralMove * (Math.random() > 0.5 ? 1 : -1));
        }

        result.put("direction", direction);
        result.put("confidence", round2(confidence));
        result.put("currentPrice", round2(lastClose));
        result.put("targetPrice", round2(target));
        result.put("indicators", Map.of(
                "ema20", round2(lastEma20),
                "ema50", round2(lastEma50),
                "macd", round4(macd),
                "macdSignal", round4(macdSignal),
                "macdHistogram", round4(macdHist),
                "rsi", round2(rsi),
                "atr", round4(atr)
        ));
        result.put("summary", buildSummary(direction, result));
        result.put("debug", Map.of(
                "horizonDays", horizonDays,
                "baseConfidence", round2(baseConfidence),
                "horizonFactor", round2(horizonFactor),
                "timeBasedFactor", round2(timeBasedFactor),
                "score", round4(score)
        ));
        logForecast(result);
        return result;
    }

    private static String buildSummary(String direction, Map<String, Object> r) {
        double conf = (double) r.get("confidence");
        String dirVi = direction.equals("UP") ? "TĂNG" : direction.equals("DOWN") ? "GIẢM" : "TRUNG TÍNH";
        return String.format("Dự báo %s trong %s ngày tới (độ tin cậy %.1f%%)", dirVi, r.get("horizonDays"), conf);
    }

    private static double round2(double v) { return Math.round(v * 100.0) / 100.0; }
    private static double round4(double v) { return Math.round(v * 10000.0) / 10000.0; }

    private static double calculateSimpleATR(List<stockprediction.model.StockData> data, int period) {
        if (data.size() < 2) return 0.0;
        double sum = 0.0; int count = 0;
        for (int i = 1; i < data.size() && i < period + 1; i++) {
            var c = data.get(i); var p = data.get(i-1);
            double tr1 = c.getHigh() - c.getLow();
            double tr2 = Math.abs(c.getHigh() - p.getClose());
            double tr3 = Math.abs(c.getLow() - p.getClose());
            sum += Math.max(tr1, Math.max(tr2, tr3));
            count++;
        }
        return count > 0 ? sum / count : 0.0;
    }

    private static void logForecast(Map<String, Object> r) {
        // Enhanced logging with horizon information
        System.out.println("[Forecast] " + r.get("symbol") + " (" + r.get("horizonDays") + " days) -> " + 
                r.get("direction") + " confidence=" + r.get("confidence") + "% target=" + r.get("targetPrice"));
        
        // Debug info
        @SuppressWarnings("unchecked")
        Map<String, Object> debug = (Map<String, Object>) r.get("debug");
        if (debug != null) {
            System.out.println("[Debug] horizonFactor=" + debug.get("horizonFactor") + 
                    ", timeBasedFactor=" + debug.get("timeBasedFactor") + ", score=" + debug.get("score"));
        }
    }
    
    /**
     * Lấy dữ liệu thực tế từ VNDIRECT API
     */
    private List<StockDataEntity> getRealStockData(String symbol) {
        try {
            // Gọi VNDIRECT API để lấy dữ liệu thực tế
            long currentTime = System.currentTimeMillis() / 1000;
            long fromTime = currentTime - (30 * 24 * 3600); // 30 ngày trước
            
            String url = "https://dchart-api.vndirect.com.vn/dchart/history?symbol=" + symbol + 
                        "&resolution=1d&from=" + fromTime + "&to=" + currentTime;
            
            RestTemplate restTemplate = new RestTemplate();
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            
            if (response != null && "ok".equals(response.get("s"))) {
                @SuppressWarnings("unchecked")
                List<Double> times = (List<Double>) response.get("t");
                @SuppressWarnings("unchecked")
                List<Double> opens = (List<Double>) response.get("o");
                @SuppressWarnings("unchecked")
                List<Double> highs = (List<Double>) response.get("h");
                @SuppressWarnings("unchecked")
                List<Double> lows = (List<Double>) response.get("l");
                @SuppressWarnings("unchecked")
                List<Double> closes = (List<Double>) response.get("c");
                @SuppressWarnings("unchecked")
                List<Double> volumes = (List<Double>) response.get("v");
                
                if (closes != null && !closes.isEmpty()) {
                    List<StockDataEntity> entities = new ArrayList<>();
                    for (int i = 0; i < closes.size(); i++) {
                        LocalDateTime timestamp = LocalDateTime.ofInstant(
                            Instant.ofEpochSecond(times.get(i).longValue()), 
                            ZoneId.systemDefault()
                        );
                        
                        entities.add(new StockDataEntity(
                            symbol,
                            timestamp,
                            opens.get(i),
                            highs.get(i),
                            lows.get(i),
                            closes.get(i),
                            volumes.get(i).longValue()
                        ));
                    }
                    
                    System.out.println("Got real forecast data for " + symbol + ": " + entities.size() + " candles");
                    return entities;
                }
            }
        } catch (Exception e) {
            System.err.println("Error getting real forecast data for " + symbol + ": " + e.getMessage());
        }
        
        // Fallback: lấy từ database
        return stockDataService.getBySymbol(symbol);
    }
}


