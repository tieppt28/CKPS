package stockprediction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import stockprediction.entity.StockDataEntity;
import stockprediction.model.StockData;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Service to initialize sample stock data for testing
 */
@Service
public class SampleDataInitializer implements CommandLineRunner {
    
    @Autowired
    private StockDataService stockDataService;
    
    private final Random random = new Random();
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== INITIALIZING SAMPLE STOCK DATA ===");
        
        // Initialize data for multiple symbols
        String[] symbols = {"FPT", "VIC", "VHM", "MSN", "HPG", "BID", "VCB", "GAS", "VNM", "TCB", "VN30F1M"};
        
        for (String symbol : symbols) {
            if (!stockDataService.symbolExists(symbol)) {
                List<StockDataEntity> sampleData = generateSampleStockData(symbol, 100);
                stockDataService.saveAll(sampleData);
                System.out.println("Generated " + sampleData.size() + " records for " + symbol);
            }
        }
        
        System.out.println("=== SAMPLE STOCK DATA INITIALIZATION COMPLETED ===");
    }
    
    /**
     * Generate sample stock data for a symbol
     */
    private List<StockDataEntity> generateSampleStockData(String symbol, int count) {
        List<StockDataEntity> data = new ArrayList<>();
        
        // Base price for different symbols
        double basePrice = getBasePriceForSymbol(symbol);
        double currentPrice = basePrice;
        
        LocalDateTime startTime = LocalDateTime.now().minusDays(30);
        
        for (int i = 0; i < count; i++) {
            LocalDateTime timestamp = startTime.plusHours(i * 6); // Every 6 hours
            
            // Generate realistic price movement
            double volatility = 0.02; // 2% volatility
            double change = (random.nextGaussian() * volatility);
            currentPrice = currentPrice * (1 + change);
            
            // Ensure price doesn't go below 10% of base price
            currentPrice = Math.max(currentPrice, basePrice * 0.1);
            
            // Generate OHLC data
            double open = currentPrice;
            double high = open * (1 + random.nextDouble() * 0.05); // Up to 5% higher
            double low = open * (1 - random.nextDouble() * 0.05);  // Up to 5% lower
            double close = low + random.nextDouble() * (high - low);
            
            // Generate volume
            long volume = (long) (1000000 + random.nextDouble() * 5000000);
            
            StockDataEntity entity = new StockDataEntity(
                symbol,
                timestamp,
                open,
                high,
                low,
                close,
                volume
            );
            
            data.add(entity);
            currentPrice = close; // Next candle starts from this close
        }
        
        return data;
    }
    
    /**
     * Get base price for different symbols
     */
    private double getBasePriceForSymbol(String symbol) {
        switch (symbol) {
            case "FPT": return 100.0;
            case "VIC": return 80.0;
            case "VHM": return 120.0;
            case "MSN": return 150.0;
            case "HPG": return 25.0;
            case "BID": return 50.0;
            case "VCB": return 90.0;
            case "GAS": return 110.0;
            case "VNM": return 70.0;
            case "TCB": return 40.0;
            case "VN30F1M": return 1500.0; // VN30 futures
            default: return 50.0;
        }
    }
}
