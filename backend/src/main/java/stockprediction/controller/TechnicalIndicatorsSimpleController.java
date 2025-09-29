package stockprediction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stockprediction.service.PredictionSignalService;
import stockprediction.entity.PredictionSignalEntity;

import java.util.HashMap;
import java.util.Map;

/**
 * Simple Technical Indicators Controller
 */
@RestController
@RequestMapping("/api/technical-indicators")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "https://ckps.vercel.app"})
public class TechnicalIndicatorsSimpleController {
    
    @Autowired
    private PredictionSignalService predictionSignalService;
    
    /**
     * Get technical indicators for VN30F1M
     */
    @GetMapping("/{symbol}")
    public ResponseEntity<Map<String, Object>> getTechnicalIndicators(@PathVariable String symbol) {
        try {
            System.out.println("[SimpleController] Getting technical indicators for " + symbol);
            
            PredictionSignalEntity latestSignal = predictionSignalService.getLatestBySymbol(symbol);
            
            if (latestSignal != null) {
                Map<String, Object> indicators = new HashMap<>();
                indicators.put("rsi", latestSignal.getRsi());
                indicators.put("symbol", symbol);
                indicators.put("timestamp", latestSignal.getTimestamp().toString());
                
                // Mock data for other indicators
                indicators.put("ema20", 1700.0);
                indicators.put("ema50", 1650.0);
                indicators.put("macd/wt", 15.5);
                indicators.put("macdSignal", 12.3);
                indicators.put("macdHistogram", 3.2);
                indicators.put("atr", 25.0);
                
                System.out.println("[SimpleController] Returning RSI: " + latestSignal.getRsi());
                return ResponseEntity.ok(indicators);
            } else {
                Map<String, Object> fallbackData = new HashMap<>();
                fallbackData.put("rsi", 50.0);
                fallbackData.put("symbol", symbol);
                fallbackData.put("ema20", 1700.0);
                fallbackData.put("ema50", 1650.0);
                fallbackData.put("macd/wt", 15.5);
                fallbackData.put("macdSignal", 12.3);
                fallbackData.put("macdHistogram", 3.2);
                fallbackData.put("atr", 25.0);
                return ResponseEntity.ok(fallbackData);
            }
            
        } catch (Exception e) {
            System.err.println("[SimpleController] Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Default endpoint
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getDefaultIndicators() {
        return getTechnicalIndicators("VN30F1M");
    }
}
