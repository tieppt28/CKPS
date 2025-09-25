package stockprediction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stockprediction.entity.StockDataEntity;
import stockprediction.indicators.TechnicalIndicators;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TrendForecastService {

    @Autowired
    private StockDataService stockDataService;

    public Map<String, Object> forecastShortTerm(String symbol, int horizonDays) {
        Map<String, Object> result = new HashMap<>();
        result.put("symbol", symbol);
        result.put("horizonDays", horizonDays);

        List<StockDataEntity> entities = stockDataService.getBySymbol(symbol);
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

        // Heuristic ensemble: EMA cross, MACD, Histogram, Price vs EMA20, RSI bands, ATR-based momentum
        double score = 0.0;
        if (lastEma20 > lastEma50) score += 0.4; else score -= 0.4;
        if (macd > macdSignal) score += 0.3; else score -= 0.3;
        if (macdHist > 0) score += 0.2; else score -= 0.2;
        if (lastClose > lastEma20) score += 0.1; else score -= 0.1;
        double rsi = rsiList.get(last);
        if (rsi < 30) score += 0.15; else if (rsi > 70) score -= 0.15;

        // ATR bước tiếp (xấp xỉ): dùng biến động gần đây để mở rộng target
        double atr = calculateSimpleATR(data, 14);

        String direction = score > 0.15 ? "UP" : (score < -0.15 ? "DOWN" : "NEUTRAL");
        double confidence = Math.min(1.0, Math.abs(score)) * 100.0;

        // Ước lượng vùng giá mục tiêu thô dựa trên EMA20
        double volFactor = Math.max(0.003, Math.min(0.02, atr / Math.max(1e-6, lastClose)));
        double target = direction.equals("UP") ? lastEma20 * (1 + volFactor * horizonDays)
                                               : direction.equals("DOWN") ? lastEma20 * (1 - volFactor * horizonDays)
                                               : lastClose;

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
        // Có thể thay bằng logger, tạm dùng System.out cho nhanh
        System.out.println("[Forecast] " + r.get("symbol") + " -> " + r.get("summary") +
                ", target=" + r.get("targetPrice") + ", indicators=" + r.get("indicators"));
    }
}


