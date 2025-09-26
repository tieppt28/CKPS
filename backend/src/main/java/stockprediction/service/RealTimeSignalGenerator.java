package stockprediction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import stockprediction.entity.PredictionSignalEntity;
import stockprediction.entity.StockDataEntity;
import stockprediction.model.PredictionSignal;
import stockprediction.model.StockData;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

/**
 * Service để tạo tín hiệu real-time mỗi khi có nến mới
 */
@Service
public class RealTimeSignalGenerator {
    
    @Autowired
    private StockDataService stockDataService;
    
    @Autowired
    private PredictionSignalService predictionSignalService;
    
    @Autowired
    private TradingViewDataService tradingViewDataService;
    
    private final Random random = new Random();
    private LocalDateTime lastCandleTime = LocalDateTime.now().minusMinutes(5);
    
    // Flag để tạm dừng tạo tín hiệu khi không có nến mới
    private boolean signalGenerationEnabled = true;
    
    // Danh sách symbols để tạo tín hiệu
    private final String[] SYMBOLS = {"FPT", "VIC", "VHM", "MSN", "HPG", "BID", "VCB", "GAS", "VNM", "TCB", "VN30F1M"};
    
    /**
     * Tạo tín hiệu chỉ khi có nến mới thực sự
     */
    @Scheduled(fixedRate = 60000) // kiểm tra mỗi phút
    public void generateRealTimeSignals() {
        if (!signalGenerationEnabled) {
            System.out.println("=== SIGNAL GENERATION DISABLED ===");
            return;
        }
        
        System.out.println("=== CHECKING FOR NEW CANDLES ===");
        
        boolean hasAnyNewCandle = false;
        
        for (String symbol : SYMBOLS) {
            try {
                // Kiểm tra xem có nến mới thực sự không
                if (!hasNewCandle(symbol)) {
                    System.out.println("No new candle for " + symbol + " - skipping signal generation");
                    continue;
                }
                
                hasAnyNewCandle = true;
                
                // Lấy nến 1P mới nhất trùng nguồn với chart
                StockDataEntity latest = getFreshLatestCandle(symbol);
                if (latest == null) {
                    System.out.println("No fresh candle data for " + symbol + " - skipping signal generation");
                    continue;
                }
                
                // Tạo tín hiệu dựa trên nến mới nhất (giá = close)
                PredictionSignalEntity signal = createSignalFromCandle(latest);
                predictionSignalService.save(signal);
                
                // Cập nhật thời gian nến cuối cùng
                lastCandleTime = latest.getTimestamp();
                
                System.out.println("Generated signal for " + symbol + " at " + LocalDateTime.now());
                
            } catch (Exception e) {
                System.err.println("Error generating signal for " + symbol + ": " + e.getMessage());
            }

        }
        
        // Nếu không có nến mới nào trong 5 phút, tạm dừng tạo tín hiệu
        if (!hasAnyNewCandle) {
            System.out.println("No new candles detected - temporarily disabling signal generation");
            signalGenerationEnabled = false;
            // Tự động bật lại sau 10 phút
            new Thread(() -> {
                try {
                    Thread.sleep(600000); // 10 phút
                    signalGenerationEnabled = true;
                    System.out.println("Signal generation re-enabled after 10 minutes");
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }).start();
        }
        
        System.out.println("=== SIGNAL GENERATION CHECK COMPLETED ===");
    }
    
    private StockDataEntity getFreshLatestCandle(String symbol) {
        try {
            StockDataEntity latest = stockDataService.getLatestBySymbol(symbol);
            LocalDateTime now = LocalDateTime.now();
            boolean needFetch = (latest == null) || latest.getTimestamp() == null
                    || latest.getTimestamp().isBefore(now.minusMinutes(2));
            if (needFetch) {
                tradingViewDataService.fetchRealTimeData(symbol);
                latest = stockDataService.getLatestBySymbol(symbol);
            }
            return latest;
        } catch (Exception e) {
            System.err.println("getFreshLatestCandle error: " + e.getMessage());
            return null;
        }
    }
    
    /**
     * Kiểm tra xem có nến mới thực sự không
     */
    private boolean hasNewCandle(String symbol) {
        try {
            StockDataEntity latest = stockDataService.getLatestBySymbol(symbol);
            if (latest == null || latest.getTimestamp() == null) {
                System.out.println("No latest candle data for " + symbol);
                return false;
            }
            
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime latestTime = latest.getTimestamp();
            
            // Kiểm tra xem nến cuối cùng có trong vòng 1 phút gần đây không (chặt chẽ hơn)
            boolean isRecent = latestTime.isAfter(now.minusMinutes(1));
            
            // Kiểm tra xem nến có mới hơn lần kiểm tra trước không (chặt chẽ hơn)
            boolean isNewer = latestTime.isAfter(lastCandleTime.plusSeconds(30));
            
            System.out.println("Candle check for " + symbol + ": latest=" + latestTime + 
                             ", now=" + now + ", lastCheck=" + lastCandleTime +
                             ", isRecent=" + isRecent + ", isNewer=" + isNewer);
            
            // Chỉ tạo tín hiệu khi có nến mới thực sự trong 1 phút gần đây
            return isRecent && isNewer;
            
        } catch (Exception e) {
            System.err.println("hasNewCandle error for " + symbol + ": " + e.getMessage());
            return false;
        }
    }
    
    /**
     * Tạo nến mới với dữ liệu thực tế
     */
    private StockDataEntity createNewCandle(String symbol) {
        // Lấy nến cuối cùng để tính toán nến mới
        StockDataEntity lastCandle = stockDataService.getLatestBySymbol(symbol);
        
        double basePrice = getBasePriceForSymbol(symbol);
        double openPrice = basePrice;

        if (lastCandle != null) {
            openPrice = lastCandle.getClose();
        }

        // Nếu giá lệch quá xa base (ví dụ dữ liệu cũ), đưa về lại quanh base
        if (Math.abs(openPrice - basePrice) > basePrice * 0.1) {
            openPrice = basePrice;
        }

        // Minute candles: dùng mean-reversion quanh base + nhiễu nhỏ
        double volatility = 0.003; // ~0.3% mỗi nến 1 phút
        double noise = random.nextGaussian() * (openPrice * volatility);
        double drift = (basePrice - openPrice) * 0.05; // kéo về base 5%
        double closePrice = openPrice + drift + noise;
        
        // Clamp trong phạm vi hợp lý quanh base
        double lower = basePrice * 0.97;
        double upper = basePrice * 1.03;
        closePrice = Math.max(lower, Math.min(upper, closePrice));
        
        // Tạo OHLC
        double high = Math.max(openPrice, closePrice) * (1 + random.nextDouble() * 0.01);
        double low = Math.min(openPrice, closePrice) * (1 - random.nextDouble() * 0.01);
        
        // Tạo volume
        long volume = (long) (1000000 + random.nextDouble() * 5000000);
        
        return new StockDataEntity(
            symbol,
            LocalDateTime.now(),
            openPrice,
            high,
            low,
            closePrice,
            volume
        );
    }
    
    /**
     * Tạo tín hiệu dựa trên nến mới
     */
    private PredictionSignalEntity createSignalFromCandle(StockDataEntity candle) {
        // Tính RSI dựa trên giá
        double rsi = calculateRSI(candle);
        
        // Xác định loại tín hiệu dựa trên RSI và xu hướng
        PredictionSignalEntity.SignalType signalType = determineSignalType(rsi, candle);
        
        // Tính độ tin cậy
        double confidence = calculateConfidence(rsi, signalType);
        
        // Tạo lý do
        String reason = generateReason(signalType, rsi, candle);
        
        // Tính điểm đảo chiều
        Double reversalPoint = calculateReversalPoint(candle, signalType);
        
        // Chọn platform ngẫu nhiên
        String platform = getRandomPlatform();
        
        return new PredictionSignalEntity(
            candle.getSymbol(),
            candle.getTimestamp(),
            signalType,
            confidence,
            reason,
            candle.getClose(),
            rsi,
            platform,
            reversalPoint
        );
    }
    
    /**
     * Tính RSI đơn giản dựa trên giá
     */
    private double calculateRSI(StockDataEntity candle) {
        // RSI(14) theo Wilder dùng chuỗi nến gần nhất
        final int period = 14;
        List<StockDataEntity> series = stockDataService.getBySymbol(candle.getSymbol());
        if (series == null || series.size() < period + 1) {
            // Không đủ dữ liệu, trả về giá trị trung tính
            return 50.0;
        }
        // Lấy 15 nến cuối (14 delta)
        int end = series.size();
        int start = Math.max(0, end - (period + 1));
        List<StockDataEntity> window = series.subList(start, end);

        double gainSum = 0.0;
        double lossSum = 0.0;
        for (int i = 1; i < window.size(); i++) {
            double change = window.get(i).getClose() - window.get(i - 1).getClose();
            if (change > 0) gainSum += change; else lossSum += -change;
        }
        double avgGain = gainSum / period;
        double avgLoss = lossSum / period;
        if (avgLoss == 0) return 100.0;
        double rs = avgGain / avgLoss;
        double rsi = 100 - (100 / (1 + rs));
        return Math.max(0, Math.min(100, rsi));
    }
    
    /**
     * Xác định loại tín hiệu
     */
    private PredictionSignalEntity.SignalType determineSignalType(double rsi, StockDataEntity candle) {
        double priceChange = (candle.getClose() - candle.getOpen()) / candle.getOpen();
        
        if (rsi > 70 && priceChange < 0) {
            return PredictionSignalEntity.SignalType.REVERSAL; // Quá mua, giá giảm
        } else if (rsi < 30 && priceChange > 0) {
            return PredictionSignalEntity.SignalType.REVERSAL; // Quá bán, giá tăng
        } else if (priceChange > 0.01) { // Tăng > 1%
            return PredictionSignalEntity.SignalType.LONG;
        } else if (priceChange < -0.01) { // Giảm > 1%
            return PredictionSignalEntity.SignalType.SHORT;
        } else {
            return PredictionSignalEntity.SignalType.HOLD;
        }
    }
    
    /**
     * Tính độ tin cậy
     */
    private double calculateConfidence(double rsi, PredictionSignalEntity.SignalType signalType) {
        double baseConfidence = 0.5;
        
        // Tăng độ tin cậy dựa trên RSI extreme
        if (rsi > 75 || rsi < 25) {
            baseConfidence += 0.2;
        } else if (rsi > 65 || rsi < 35) {
            baseConfidence += 0.1;
        }
        
        // Tăng độ tin cậy cho REVERSAL
        if (signalType == PredictionSignalEntity.SignalType.REVERSAL) {
            baseConfidence += 0.15;
        }
        
        // Thêm random factor
        baseConfidence += random.nextDouble() * 0.2;
        
        return Math.min(0.95, Math.max(0.3, baseConfidence));
    }
    
    /**
     * Tạo lý do cho tín hiệu
     */
    private String generateReason(PredictionSignalEntity.SignalType signalType, double rsi, StockDataEntity candle) {
        StringBuilder reason = new StringBuilder();
        
        switch (signalType) {
            case LONG:
                reason.append("TÍN HIỆU MUA: Giá tăng mạnh, RSI: ").append(String.format("%.2f", rsi));
                break;
            case SHORT:
                reason.append("TÍN HIỆU BÁN: Giá giảm mạnh, RSI: ").append(String.format("%.2f", rsi));
                break;
            case REVERSAL:
                if (rsi > 70) {
                    reason.append("CẢNH BÁO QUÁ MUA: RSI = ").append(String.format("%.2f", rsi)).append(" > 70. Thị trường có thể điều chỉnh.");
                } else {
                    reason.append("CƠ HỘI MUA VÀO: RSI = ").append(String.format("%.2f", rsi)).append(" < 30. Thị trường có thể phục hồi.");
                }
                break;
            default:
                reason.append("GIỮ: RSI: ").append(String.format("%.2f", rsi)).append(", thị trường ổn định.");
        }
        
        // Thêm thông tin kỹ thuật
        reason.append(";RSI:").append(String.format("%.2f", rsi));
        reason.append(";Platform:").append(getRandomPlatform());
        if (calculateReversalPoint(candle, signalType) != null) {
            reason.append(";Reversal:").append(String.format("%.2f", calculateReversalPoint(candle, signalType)));
        }
        
        return reason.toString();
    }
    
    /**
     * Tính điểm đảo chiều
     */
    private Double calculateReversalPoint(StockDataEntity candle, PredictionSignalEntity.SignalType signalType) {
        // Điểm đảo chiều dựa trên swing gần nhất và ATR(14)
        final int period = 14;
        List<StockDataEntity> series = stockDataService.getBySymbol(candle.getSymbol());
        if (series == null || series.size() < period + 1) return null;
        int end = series.size();
        int start = Math.max(0, end - period);
        List<StockDataEntity> window = series.subList(start, end);

        double atr = calculateATR(window);
        double currentClose = candle.getClose();
        double swingHigh = window.stream().mapToDouble(StockDataEntity::getHigh).max().orElse(currentClose);
        double swingLow = window.stream().mapToDouble(StockDataEntity::getLow).min().orElse(currentClose);

        switch (signalType) {
            case LONG:
                // Đảo chiều khi thủng swingLow - 0.5 ATR
                return Math.min(currentClose, swingLow - 0.5 * atr);
            case SHORT:
                // Đảo chiều khi vượt swingHigh + 0.5 ATR
                return Math.max(currentClose, swingHigh + 0.5 * atr);
            case REVERSAL:
                // Nếu đang tăng mạnh, dùng swingLow; nếu giảm mạnh, dùng swingHigh
                if (candle.getClose() >= candle.getOpen()) {
                    return swingLow;
                } else {
                    return swingHigh;
                }
            default:
                return null;
        }
    }

    private double calculateATR(List<StockDataEntity> window) {
        if (window.size() < 2) return 0.0;
        double sumTR = 0.0;
        for (int i = 1; i < window.size(); i++) {
            StockDataEntity cur = window.get(i);
            StockDataEntity prev = window.get(i - 1);
            double highLow = cur.getHigh() - cur.getLow();
            double highPrevClose = Math.abs(cur.getHigh() - prev.getClose());
            double lowPrevClose = Math.abs(cur.getLow() - prev.getClose());
            double tr = Math.max(highLow, Math.max(highPrevClose, lowPrevClose));
            sumTR += tr;
        }
        return sumTR / (window.size() - 1);
    }
    
    /**
     * Lấy platform ngẫu nhiên
     */
    private String getRandomPlatform() {
        String[] platforms = {"HOSE", "HNX", "UPCOM", "OTC", "FOREIGN"};
        return platforms[random.nextInt(platforms.length)];
    }
    
    /**
     * Lấy giá cơ sở cho symbol
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
            case "VN30F1M": return 1825.0; // đồng bộ giá nền VN30F1M
            default: return 50.0;
        }
    }
}

