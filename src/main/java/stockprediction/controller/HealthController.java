package stockprediction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Health Check Controller for Railway deployment
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    /**
     * Main health check endpoint for Railway
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Stock Prediction System API");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("version", "1.0.0");
        response.put("environment", "production");
        
        // Add system info
        Map<String, Object> system = new HashMap<>();
        system.put("java_version", System.getProperty("java.version"));
        system.put("os_name", System.getProperty("os.name"));
        system.put("available_processors", Runtime.getRuntime().availableProcessors());
        system.put("max_memory", Runtime.getRuntime().maxMemory());
        system.put("total_memory", Runtime.getRuntime().totalMemory());
        system.put("free_memory", Runtime.getRuntime().freeMemory());
        
        response.put("system", system);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Simple health check for load balancers
     */
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }
    
    /**
     * Readiness check
     */
    @GetMapping("/ready")
    public ResponseEntity<Map<String, String>> readiness() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "READY");
        response.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }
}
