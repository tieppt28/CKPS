package stockprediction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Simple test controller for technical indicators
 */
@RestController
@RequestMapping("/api/test-technical")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "https://ckps.vercel.app"})
public class TestTechnicalController {
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getTestData() {
        Map<String, Object> data = new HashMap<>();
        data.put("rsi", 65.5);
        data.put("ema20", 100.25);
        data.put("ema50", 98.75);
        data.put("macd", 1.25);
        data.put("macdSignal", 1.15);
        data.put("macdHistogram", 0.10);
        data.put("atr", 2.5);
        data.put("symbol", "FPT");
        data.put("timestamp", java.time.LocalDateTime.now().toString());
        
        return ResponseEntity.ok(data);
    }
}









