package stockprediction.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Configuration để enable scheduling cho real-time signal generation
 */
@Configuration
@EnableScheduling
public class SchedulingConfig {
    // Configuration class để enable @Scheduled annotations
}

