package stockprediction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Main Spring Boot Application for Stock Prediction System
 */
@SpringBootApplication
public class StockPredictionApplication {

    public static void main(String[] args) {
        try {
            SpringApplication.run(StockPredictionApplication.class, args);
            System.out.println("\n=== STOCK PREDICTION SYSTEM STARTED ===");
            System.out.println("Health check: /health");
            System.out.println("Test endpoint: /test");
            System.out.println("Real-time signal generation: ENABLED (every 5 minutes)");
            System.out.println("Auto candle creation: ENABLED");
            System.out.println("==========================================\n");
        } catch (Exception e) {
            System.err.println("Failed to start application: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}

