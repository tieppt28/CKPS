package stockprediction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Test Controller for basic functionality
 */
@RestController
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "API is working!");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", "OK");
        return ResponseEntity.ok(response);
    }
}
