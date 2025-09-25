package stockprediction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stockprediction.service.StockDataService;
import stockprediction.indicators.TechnicalIndicators;
import stockprediction.model.StockData;
import stockprediction.entity.StockDataEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Technical Indicators
 */
@RestController
@RequestMapping("/technical-indicators")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "https://ckps.vercel.app"})
public class TechnicalIndicatorsController {
    
    @Autowired
    private StockDataService stockDataService;
    
    /**
     * Get technical indicators for a specific symbol
     */
    @GetMapping("/{symbol}")
    public ResponseEntity<Map<String, Object>> getTechnicalIndicators(@PathVariable String symbol) {
        try {
            List<StockDataEntity> stockDataEntities = stockDataService.getBySymbol(symbol);
            if (stockDataEntities.isEmpty()) {
                return ResponseEntity.badRequest().body(
                    Map.of("error", "No data found for symbol: " + symbol)
                );
            }
            
            // Convert entities to StockData objects
            List<StockData> stockData = stockDataService.convertToStockDataList(stockDataEntities);
            
            // Calculate technical indicators
            List<Double> rsi = TechnicalIndicators.calculateRSI(stockData, 14);
            List<Double> ema20 = TechnicalIndicators.calculateEMA(stockData, 20);
            List<Double> ema50 = TechnicalIndicators.calculateEMA(stockData, 50);
            TechnicalIndicators.MACDResult macd = TechnicalIndicators.calculateMACD(stockData, 12, 26, 9);
            
            // Get latest values
            int lastIndex = stockData.size() - 1;
            Double currentRsi = rsi.get(lastIndex);
            Double currentEma20 = ema20.get(lastIndex);
            Double currentEma50 = ema50.get(lastIndex);
            Double currentMacd = macd.getMacdLine().get(lastIndex);
            Double currentMacdSignal = macd.getSignalLine().get(lastIndex);
            Double currentMacdHistogram = macd.getHistogram().get(lastIndex);
            
            // Calculate ATR (Average True Range) - simplified version
            double atr = calculateATR(stockData, 14);
            
            Map<String, Object> indicators = new HashMap<>();
            indicators.put("rsi", currentRsi != null ? currentRsi : 0.0);
            indicators.put("ema20", currentEma20 != null ? currentEma20 : 0.0);
            indicators.put("ema50", currentEma50 != null ? currentEma50 : 0.0);
            indicators.put("macd", currentMacd != null ? currentMacd : 0.0);
            indicators.put("macdSignal", currentMacdSignal != null ? currentMacdSignal : 0.0);
            indicators.put("macdHistogram", currentMacdHistogram != null ? currentMacdHistogram : 0.0);
            indicators.put("atr", atr);
            indicators.put("symbol", symbol);
            indicators.put("timestamp", stockData.get(lastIndex).getTimestamp().toString());
            
            return ResponseEntity.ok(indicators);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                Map.of("error", "Failed to calculate technical indicators for " + symbol, "message", e.getMessage())
            );
        }
    }
    
    /**
     * Get technical indicators for default symbol (FPT)
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getDefaultTechnicalIndicators() {
        return getTechnicalIndicators("FPT");
    }
    
    /**
     * Calculate Average True Range (ATR)
     */
    private double calculateATR(List<StockData> data, int period) {
        if (data.size() < 2) return 0.0;
        
        double sum = 0.0;
        int count = 0;
        
        for (int i = 1; i < data.size() && i < period + 1; i++) {
            StockData current = data.get(i);
            StockData previous = data.get(i - 1);
            
            double high = current.getHigh();
            double low = current.getLow();
            double prevClose = previous.getClose();
            
            double tr1 = high - low;
            double tr2 = Math.abs(high - prevClose);
            double tr3 = Math.abs(low - prevClose);
            
            double trueRange = Math.max(tr1, Math.max(tr2, tr3));
            sum += trueRange;
            count++;
        }
        
        return count > 0 ? sum / count : 0.0;
    }
    
    /**
     * Health check
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "Technical Indicators API",
            "timestamp", java.time.LocalDateTime.now().toString()
        ));
    }
}
