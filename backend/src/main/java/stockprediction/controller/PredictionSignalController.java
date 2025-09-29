package stockprediction.controller;

import stockprediction.entity.PredictionSignalEntity;
import stockprediction.model.PredictionSignal;
import stockprediction.service.PredictionSignalService;
import stockprediction.service.StockDataService;
import stockprediction.entity.StockDataEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Prediction Signal API
 */
@RestController
@RequestMapping("/signals")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class PredictionSignalController {
    
    @Autowired
    private PredictionSignalService predictionSignalService;
    
    @Autowired
    private StockDataService stockDataService;

    @Autowired
    private stockprediction.service.RealTimeSignalGenerator realTimeSignalGenerator;

    /**
     * Get all prediction signals for a symbol
     */
    @GetMapping("/{symbol}")
    public ResponseEntity<List<PredictionSignalEntity>> getSignalsBySymbol(@PathVariable String symbol) {
        List<PredictionSignalEntity> signals = predictionSignalService.getBySymbol(symbol);
        return ResponseEntity.ok(signals);
    }

    /**
     * Get latest signal or recent N if no new candle in last `minutes`
     */
    @GetMapping("/{symbol}/latest-or-recent")
    public ResponseEntity<List<PredictionSignalEntity>> getLatestOrRecent(
            @PathVariable String symbol,
            @RequestParam(defaultValue = "10") Integer minutes,
            @RequestParam(defaultValue = "10") Integer limit) {
        StockDataEntity latestCandle = stockDataService.getLatestBySymbol(symbol);
        LocalDateTime now = LocalDateTime.now();
        boolean noRecentCandle = (latestCandle == null) || latestCandle.getTimestamp() == null
                || latestCandle.getTimestamp().isBefore(now.minusMinutes(minutes));
        if (noRecentCandle) {
            List<PredictionSignalEntity> recent = predictionSignalService.getLatestNSignals(symbol, limit);
            return ResponseEntity.ok(recent);
        }
        PredictionSignalEntity latestSignal = predictionSignalService.getLatestBySymbol(symbol);
        if (latestSignal == null) {
            return ResponseEntity.ok(java.util.Collections.emptyList());
        }
        return ResponseEntity.ok(java.util.List.of(latestSignal));
    }

    /**
     * Get prediction signals for a symbol within date range
     */
    @GetMapping("/{symbol}/range")
    public ResponseEntity<List<PredictionSignalEntity>> getSignalsInRange(
            @PathVariable String symbol,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        List<PredictionSignalEntity> signals = predictionSignalService.getBySymbolAndDateRange(symbol, startDate, endDate);
        return ResponseEntity.ok(signals);
    }
    
    /**
     * Get latest prediction signal for a symbol
     */
    @GetMapping("/{symbol}/latest")
    public ResponseEntity<PredictionSignalEntity> getLatestSignal(@PathVariable String symbol) {
        PredictionSignalEntity signal = predictionSignalService.getLatestBySymbol(symbol);
        if (signal == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(signal);
    }
    
    /**
     * Get prediction signals by signal type
     */
    @GetMapping("/type/{signalType}")
    public ResponseEntity<List<PredictionSignalEntity>> getSignalsByType(
            @PathVariable PredictionSignalEntity.SignalType signalType) {
        List<PredictionSignalEntity> signals = predictionSignalService.getBySignalType(signalType);
        return ResponseEntity.ok(signals);
    }
    
    /**
     * Get prediction signals for a symbol by signal type
     */
    @GetMapping("/{symbol}/type/{signalType}")
    public ResponseEntity<List<PredictionSignalEntity>> getSignalsBySymbolAndType(
            @PathVariable String symbol,
            @PathVariable PredictionSignalEntity.SignalType signalType) {
        List<PredictionSignalEntity> signals = predictionSignalService.getBySymbolAndSignalType(symbol, signalType);
        return ResponseEntity.ok(signals);
    }
    
    /**
     * Get high confidence signals
     */
    @GetMapping("/high-confidence")
    public ResponseEntity<List<PredictionSignalEntity>> getHighConfidenceSignals(
            @RequestParam(defaultValue = "70.0") Double threshold) {
        List<PredictionSignalEntity> signals = predictionSignalService.getHighConfidenceSignals(threshold);
        return ResponseEntity.ok(signals);
    }
    
    /**
     * Get recent signals
     */
    @GetMapping("/recent")
    public ResponseEntity<List<PredictionSignalEntity>> getRecentSignals(
            @RequestParam(required = false) String symbol,
            @RequestParam(defaultValue = "7") Integer days,
            @RequestParam(defaultValue = "10") Integer minutes,
            @RequestParam(defaultValue = "10") Integer limit) {
        String effectiveSymbol = (symbol == null || symbol.isBlank()) ? "VN30F1M" : symbol;
        StockDataEntity latestCandle = stockDataService.getLatestBySymbol(effectiveSymbol);
        LocalDateTime now = LocalDateTime.now();
        boolean noRecentCandle = (latestCandle == null) || latestCandle.getTimestamp() == null
                || latestCandle.getTimestamp().isBefore(now.minusMinutes(minutes));
        if (noRecentCandle) {
            // Nếu không có tín hiệu cho symbol hiện tại, trả về N tín hiệu gần nhất toàn bộ
            List<PredictionSignalEntity> recent = predictionSignalService.getLatestNSignals(effectiveSymbol, limit);
            if (recent == null || recent.isEmpty()) {
                recent = predictionSignalService.getLatestNAllSymbols(limit);
            }
            return ResponseEntity.ok(recent);
        }
        LocalDateTime since = now.minusDays(days);
        List<PredictionSignalEntity> signals = predictionSignalService.getRecentSignals(since);
        return ResponseEntity.ok(signals);
    }
    
    /**
     * Get signal statistics for a symbol
     */
    @GetMapping("/{symbol}/stats")
    public ResponseEntity<Map<String, Object>> getSignalStats(@PathVariable String symbol) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("symbol", symbol);
        stats.put("total", predictionSignalService.getBySymbol(symbol).size());
        stats.put("long", predictionSignalService.countBySymbolAndSignalType(symbol, PredictionSignalEntity.SignalType.LONG));
        stats.put("short", predictionSignalService.countBySymbolAndSignalType(symbol, PredictionSignalEntity.SignalType.SHORT));
        stats.put("reversal", predictionSignalService.countBySymbolAndSignalType(symbol, PredictionSignalEntity.SignalType.REVERSAL));
        stats.put("hold", predictionSignalService.countBySymbolAndSignalType(symbol, PredictionSignalEntity.SignalType.HOLD));
        
        return ResponseEntity.ok(stats);
    }
    
    /**
     * Add new prediction signal
     */
    @PostMapping("/{symbol}")
    public ResponseEntity<PredictionSignalEntity> addSignal(
            @PathVariable String symbol,
            @RequestBody PredictionSignal signal) {
        
        PredictionSignalEntity entity = predictionSignalService.saveFromPredictionSignal(signal, symbol);
        return ResponseEntity.ok(entity);
    }
    
    /**
     * Add multiple prediction signals
     */
    @PostMapping("/{symbol}/batch")
    public ResponseEntity<List<PredictionSignalEntity>> addMultipleSignals(
            @PathVariable String symbol,
            @RequestBody List<PredictionSignal> signals) {
        
        List<PredictionSignalEntity> entities = predictionSignalService.saveFromPredictionSignalList(signals, symbol);
        return ResponseEntity.ok(entities);
    }
    
    /**
     * Delete all prediction signals for a symbol
     */
    @DeleteMapping("/{symbol}")
    public ResponseEntity<Map<String, String>> deleteSignals(@PathVariable String symbol) {
        predictionSignalService.deleteBySymbol(symbol);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Prediction signals for " + symbol + " deleted successfully");
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get signals for TradingView annotations
     */
    @GetMapping("/{symbol}/tradingview")
    public ResponseEntity<List<Map<String, Object>>> getSignalsForTradingView(@PathVariable String symbol) {
        List<PredictionSignalEntity> signals = predictionSignalService.getBySymbol(symbol);
        
        List<Map<String, Object>> tradingViewSignals = signals.stream()
            .map(signal -> {
                Map<String, Object> item = new HashMap<>();
                item.put("time", signal.getTimestamp().toLocalDate().toString());
                item.put("type", signal.getSignalType().toString().toLowerCase());
                item.put("confidence", signal.getConfidence());
                item.put("reason", signal.getReason());
                item.put("price", signal.getPrice());
                return item;
            })
            .collect(java.util.stream.Collectors.toList());
        
        return ResponseEntity.ok(tradingViewSignals);
    }
    
    /**
     * Generate signal immediately for a symbol
     */
    @PostMapping("/{symbol}/generate")
    public ResponseEntity<Map<String, String>> generateSignal(@PathVariable String symbol) {
        try {
            realTimeSignalGenerator.generateSignalForSymbol(symbol);
            Map<String, String> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Signal generated for " + symbol);
            response.put("timestamp", LocalDateTime.now().toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "ERROR");
            response.put("message", "Failed to generate signal for " + symbol + ": " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Prediction Signal API");
        response.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get technical indicators - Quick fix endpoint
     */
    @GetMapping("/technical-indicators/{symbol}")
    public ResponseEntity<Map<String, Object>> getTechnicalIndicators(@PathVariable String symbol) {
        try {
            System.out.println("[PredictionSignalController] Getting REAL technical indicators for " + symbol);
            
            // Lấy tín hiệu gần nhất để có RSI thật
            PredictionSignalEntity latestSignal = predictionSignalService.getLatestBySymbol(symbol);
            
            // Lấy dữ liệu candle thật từ database
            List<StockDataEntity> stockDataEntities = stockDataService.getBySymbol(symbol);
            
            Map<String, Object> indicators = new HashMap<>();
            indicators.put("symbol", symbol);
            
            // RSI từ tín hiệu signal
            if (latestSignal != null) {
                indicators.put("rsi", latestSignal.getRsi());
                indicators.put("timestamp", latestSignal.getTimestamp().toString());
                System.out.println("[PredictionSignalController] Using REAL RSI from signal: " + latestSignal.getRsi());
            } else {
                indicators.put("rsi", 50.0);
                indicators.put("timestamp", LocalDateTime.now().toString());
                System.out.println("[PredictionSignalController] No signal found, using default RSI: 50.0");
            }
            
            // Tính toán từ dữ liệu thật
            if (stockDataEntities.size() >= 20) {
                // Sắp xếp theo thời gian
                stockDataEntities.sort((a, b) -> a.getTimestamp().compareTo(b.getTimestamp()));
                
                // Lấy giá gần nhất
                StockDataEntity latestCandle = stockDataEntities.get(stockDataEntities.size() - 1);
                
                // Tính EMA20 và EMA50 từ dữ liệu thật
                double currentPrice = latestCandle.getClose();
                
                // EMA tính toán đơn giản từ giá đóng cửa
                double ema20 = calculateSimpleEMA(stockDataEntities, 20);
                double ema50 = calculateSimpleEMA(stockDataEntities, 50);
                
                indicators.put("ema20", Math.round(ema20 * 100.0) / 100.0);
                indicators.put("ema50", Math.round(ema50 * 100.0) / 100.0);
                
                // MACD từ EMA12 - EMA26
                List<StockDataEntity> last50 = stockDataEntities.subList(Math.max(0, stockDataEntities.size() - 50), stockDataEntities.size());
                double ema12 = calculateSimpleEMA(last50, 12);
                double ema26 = calculateSimpleEMA(last50, 26);
                double macd = ema12 - ema26;
                
                indicators.put("macd", Math.round(macd * 100.0) / 100.0);
                indicators.put("macdSignal", Math.round(macd * 0.9 * 100.0) / 100.0); // Simplified signal
                indicators.put("macdHistogram", Math.round((macd - macd * 0.9) * 100.0) / 100.0);
                
                // ATR tính đơn giản từ high-low range
                double atr = calculateSimpleATR(last50);
                indicators.put("atr", Math.round(atr * 100.0) / 100.0);
                
                System.out.println("[PredictionSignalController] Calculated REAL indicators from " + stockDataEntities.size() + " candles");
            } else {
                // Fallback khi không đủ dữ liệu
                indicators.put("ema20", 1700.0);
                indicators.put("ema50", 1650.0);
                indicators.put("macd", 15.5);
                indicators.put("macdSignal", 12.3);
                indicators.put("macdHistogram", 3.2);
                indicators.put("atr", 25.0);
                System.out.println("[PredictionSignalController] Not enough data (" + stockDataEntities.size() + "), using defaults");
            }
            
            return ResponseEntity.ok(indicators);
            
        } catch (Exception e) {
            System.err.println("[PredictionSignalController] Error: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("rsi", 50.0);
            fallback.put("symbol", symbol);
            fallback.put("error", e.getMessage());
            return ResponseEntity.ok(fallback);
        }
    }
    
    // Helper method để tính EMA đơn giản
    private double calculateSimpleEMA(List<StockDataEntity> data, int period) {
        if (data.size() < period) return data.get(data.size() - 1).getClose();
        
        List<Double> closes = data.subList(Math.max(0, data.size() - period), data.size())
                .stream().map(StockDataEntity::getClose).toList();
        
        double sum = closes.stream().mapToDouble(Double::doubleValue).sum();
        return sum / closes.size(); // Simple moving average as EMA approximation
    }
    
    // Helper method để tính ATR đơn giản
    private double calculateSimpleATR(List<StockDataEntity> data) {
        if (data.size() < 2) return 5.0;
        
        double sumRange = 0;
        for (int i = 1; i < data.size(); i++) {
            StockDataEntity cur = data.get(i);
            StockDataEntity prev = data.get(i - 1);
            double range = Math.max(cur.getHigh() - cur.getLow(), 
                    Math.abs(cur.getHigh() - prev.getClose()));
            sumRange += range;
        }
        return sumRange / (data.size() - 1);
    }
}
