package stockprediction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Health Check Controller for Railway deployment
 */
@RestController
public class HealthController {

    /**
     * Root health check endpoint
     */
    @GetMapping("/")
    public ResponseEntity<Map<String, String>> root() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Stock Prediction System");
        response.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }

    /**
     * Main health check endpoint for Railway
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Stock Prediction System API");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("version", "1.0.0");
        response.put("environment", "production");
        return ResponseEntity.ok(response);
    }
    
    /**
     * Simple health check for load balancers
     */
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }
}
