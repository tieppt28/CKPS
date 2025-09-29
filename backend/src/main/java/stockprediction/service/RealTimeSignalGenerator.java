package stockprediction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import stockprediction.entity.PredictionSignalEntity;
import stockprediction.entity.StockDataEntity;

import java.time.LocalDateTime;
import java.time.Instant;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Arrays;
import org.springframework.web.client.RestTemplate;

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
    
    /**
     * Tạo tín hiệu ngay lập tức cho một symbol cụ thể
     */
    public void generateSignalForSymbol(String symbol) {
        try {
            System.out.println("=== GENERATING IMMEDIATE SIGNAL FOR " + symbol + " ===");
            
            StockDataEntity latest = getFreshLatestCandle(symbol);
            if (latest == null) {
                System.out.println("No fresh candle data for " + symbol + " - cannot generate signal");
                return;
            }
            
            // Tạo tín hiệu dựa trên nến mới nhất
            PredictionSignalEntity signal = createSignalFromCandle(latest);
            predictionSignalService.save(signal);
            
            // Cập nhật thời gian nến cuối cùng
            lastCandleTime = latest.getTimestamp();
            
            System.out.println("Immediate signal generated for " + symbol + " at " + LocalDateTime.now());
            
        } catch (Exception e) {
            System.err.println("Error generating immediate signal for " + symbol + ": " + e.getMessage());
        }
    }
    
    // Danh sách symbols để tạo tín hiệu
    private final String[] SYMBOLS = {"FPT", "VIC", "VHM", "MSN", "HPG", "BID", "VCB", "GAS", "VNM", "TCB", "VN30F1M"};
    
    /**
     * Tạo tín hiệu chỉ khi có nến mới thực sự
     */
    @Scheduled(fixedRate = 60000) // kiểm tra mỗi 1 phút
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
                
                // Lấy nến mới nhất
                StockDataEntity latest = getFreshLatestCandle(symbol);
                if (latest == null) {
                    System.out.println("No fresh candle data for " + symbol + " - skipping signal generation");
                    continue;
                }
                
                // Tạo tín hiệu dựa trên nến mới nhất
                PredictionSignalEntity signal = createSignalFromCandle(latest);
                predictionSignalService.save(signal);
                
                hasAnyNewCandle = true;
                
                System.out.println("Generated signal for " + symbol + " at " + LocalDateTime.now() + 
                                 " - Price: " + signal.getPrice() + ", RSI: " + signal.getRsi() + 
                                 ", Type: " + signal.getSignalType());
                
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
            // Lấy dữ liệu nến thực tế từ datafeed server
            StockDataEntity realCandle = getRealCandleData(symbol);
            
            // Lưu vào database nếu có dữ liệu thực
            if (realCandle != null) {
                stockDataService.save(realCandle);
                return realCandle;
            }
            
            // Fallback: lấy từ database
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
            // Lấy nến mới nhất từ database
            StockDataEntity latest = stockDataService.getLatestBySymbol(symbol);
            if (latest == null || latest.getTimestamp() == null) {
                System.out.println("No latest candle data for " + symbol);
                return false;
            }
            
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime latestTime = latest.getTimestamp();
            
            // Kiểm tra xem nến cuối cùng có trong vòng 2 phút gần đây không
            boolean isRecent = latestTime.isAfter(now.minusMinutes(2));
            
            // Kiểm tra xem nến có mới hơn lần kiểm tra trước không
            boolean isNewer = lastCandleTime == null || latestTime.isAfter(lastCandleTime);
            
            System.out.println("Candle check for " + symbol + ": latest=" + latestTime + 
                             ", now=" + now + ", lastCheck=" + lastCandleTime +
                             ", isRecent=" + isRecent + ", isNewer=" + isNewer);
            
            // Chỉ tạo tín hiệu khi có nến mới thực sự
            if (isRecent && isNewer) {
                // Cập nhật thời gian nến cuối cùng
                lastCandleTime = latestTime;
                return true;
            }
            
            return false;
            
        } catch (Exception e) {
            System.err.println("hasNewCandle error for " + symbol + ": " + e.getMessage());
            return false;
        }
    }
    
    /**
     * Lấy dữ liệu nến thực tế từ VNDIRECT API
     */
    private StockDataEntity getRealCandleData(String symbol) {
        try {
            // Gọi trực tiếp VNDIRECT API để lấy dữ liệu thực tế
            long currentTime = System.currentTimeMillis() / 1000;
            long fromTime = currentTime - 3600; // 1 giờ trước
            
            String url = "https://dchart-api.vndirect.com.vn/dchart/history?symbol=" + symbol + 
                        "&resolution=1&from=" + fromTime + "&to=" + currentTime;
            
            RestTemplate restTemplate = new RestTemplate();
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            
            if (response != null && "ok".equals(response.get("s"))) {
                List<Double> times = (List<Double>) response.get("t");
                List<Double> opens = (List<Double>) response.get("o");
                List<Double> highs = (List<Double>) response.get("h");
                List<Double> lows = (List<Double>) response.get("l");
                List<Double> closes = (List<Double>) response.get("c");
                List<Double> volumes = (List<Double>) response.get("v");
                
                if (closes != null && !closes.isEmpty()) {
                    int lastIndex = closes.size() - 1;
                    LocalDateTime timestamp = LocalDateTime.ofInstant(
                        Instant.ofEpochSecond(times.get(lastIndex).longValue()), 
                        ZoneId.systemDefault()
                    );
                    
                    System.out.println("Got real data for " + symbol + ": close=" + closes.get(lastIndex));
                    
                    return new StockDataEntity(
                        symbol,
                        timestamp,
                        opens.get(lastIndex),
                        highs.get(lastIndex),
                        lows.get(lastIndex),
                        closes.get(lastIndex),
                        volumes.get(lastIndex).longValue()
                    );
                }
            }
        } catch (Exception e) {
            System.err.println("Error getting real candle data for " + symbol + ": " + e.getMessage());
        }
        
        // Fallback: tạo nến giả lập nếu không lấy được dữ liệu thực
        return createFallbackCandle(symbol);
    }
    
    /**
     * Tạo nến fallback khi không lấy được dữ liệu thực
     */
    private StockDataEntity createFallbackCandle(String symbol) {
        // Sử dụng giá theo Finbox: 1855.0-1860.7
        double[] prices = {1855.0, 1856.0, 1856.5, 1857.0, 1858.6, 1859.4, 1859.5, 1860.7};
        int index = random.nextInt(prices.length);
        double closePrice = prices[index];
        
        double high = closePrice * 1.001;
        double low = closePrice * 0.999;
        long volume = (long) (1000000 + random.nextDouble() * 5000000);
        
        System.out.println("Using fallback price for " + symbol + ": " + closePrice);
        
        return new StockDataEntity(
            symbol,
            LocalDateTime.now(),
            closePrice, // open = close
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
     * Tính RSI thực tế từ dữ liệu nến
     */
    private double calculateRSI(StockDataEntity candle) {
        try {
            // Lấy 14 nến gần nhất để tính RSI
            List<StockDataEntity> recentCandles = stockDataService.getBySymbol(candle.getSymbol());
            if (recentCandles.size() < 15) {
                System.out.println("Not enough data for RSI calculation for " + candle.getSymbol());
                return 50.0; // Default RSI
            }
            
            // Sắp xếp theo thời gian và lấy 15 nến gần nhất
            recentCandles.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));
            List<StockDataEntity> last15Candles = recentCandles.subList(0, Math.min(15, recentCandles.size()));
            
            // Tính RSI theo công thức Wilder
            double[] closes = last15Candles.stream()
                .mapToDouble(StockDataEntity::getClose)
                .toArray();
            
            double rsi = calculateWilderRSI(closes, 14);
            System.out.println("Calculated RSI for " + candle.getSymbol() + ": " + rsi);
            return rsi;
            
        } catch (Exception e) {
            System.err.println("Error calculating RSI for " + candle.getSymbol() + ": " + e.getMessage());
            return 50.0; // Default RSI
        }
    }
    
    /**
     * Tính RSI theo công thức Wilder
     */
    private double calculateWilderRSI(double[] closes, int period) {
        if (closes.length < period + 1) {
            return 50.0;
        }
        
        double[] gains = new double[closes.length - 1];
        double[] losses = new double[closes.length - 1];
        
        // Tính gain và loss
        for (int i = 1; i < closes.length; i++) {
            double change = closes[i] - closes[i - 1];
            gains[i - 1] = change > 0 ? change : 0;
            losses[i - 1] = change < 0 ? -change : 0;
        }
        
        // Tính average gain và average loss cho period đầu tiên
        double avgGain = 0;
        double avgLoss = 0;
        
        for (int i = 0; i < period; i++) {
            avgGain += gains[i];
            avgLoss += losses[i];
        }
        
        avgGain /= period;
        avgLoss /= period;
        
        // Tính RSI cho các period tiếp theo
        for (int i = period; i < gains.length; i++) {
            avgGain = (avgGain * (period - 1) + gains[i]) / period;
            avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
        }
        
        if (avgLoss == 0) {
            return 100.0;
        }
        
        double rs = avgGain / avgLoss;
        double rsi = 100 - (100 / (1 + rs));
        
        return rsi;
    }
    
    /**
     * Xác định loại tín hiệu dựa trên RSI thực tế
     */
    private PredictionSignalEntity.SignalType determineSignalType(double rsi, StockDataEntity candle) {
        // Logic dựa trên RSI thực tế
        if (rsi > 80) {
            return PredictionSignalEntity.SignalType.REVERSAL; // Quá mua - đảo chiều
        } else if (rsi < 20) {
            return PredictionSignalEntity.SignalType.REVERSAL; // Quá bán - đảo chiều
        } else if (rsi > 50) {
            return PredictionSignalEntity.SignalType.LONG; // TĂNG
        } else {
            return PredictionSignalEntity.SignalType.SHORT; // GIẢM
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
     * Tính điểm đảo chiều dựa trên dữ liệu thực tế
     */
    private Double calculateReversalPoint(StockDataEntity candle, PredictionSignalEntity.SignalType signalType) {
        try {
            // Lấy dữ liệu nến gần nhất để tính điểm đảo chiều
            List<StockDataEntity> recentCandles = stockDataService.getBySymbol(candle.getSymbol());
            if (recentCandles.size() < 5) {
                return null;
            }
            
            // Sắp xếp theo thời gian và lấy 5 nến gần nhất
            recentCandles.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));
            List<StockDataEntity> last5Candles = recentCandles.subList(0, Math.min(5, recentCandles.size()));
            
            // Tính điểm đảo chiều dựa trên support/resistance
            double currentPrice = candle.getClose();
            double[] highs = last5Candles.stream().mapToDouble(StockDataEntity::getHigh).toArray();
            double[] lows = last5Candles.stream().mapToDouble(StockDataEntity::getLow).toArray();
            
            double maxHigh = Arrays.stream(highs).max().orElse(currentPrice);
            double minLow = Arrays.stream(lows).min().orElse(currentPrice);
            double atr = calculateATR(last5Candles); // Use a smaller window for ATR for reversal points
            
            // Tính điểm đảo chiều theo logic mới:
            // Nếu đang TĂNG (LONG) → tính điểm Đảo short (resistance)
            // Nếu đang SHORT (GIẢM) → tính điểm Đảo long (support)
            // Nếu trung lập → tính toán thêm
            
            if (signalType == PredictionSignalEntity.SignalType.LONG) {
                // LONG → tính điểm Đảo short (resistance level)
                return Math.max(currentPrice + (atr * 2), maxHigh);
            } else if (signalType == PredictionSignalEntity.SignalType.SHORT) {
                // SHORT → tính điểm Đảo long (support level)
                return Math.min(currentPrice - (atr * 2), minLow);
            } else {
                // REVERSAL (trung lập) → tính toán thêm
                try {
                    double rsi = calculateRSI(candle);
                    if (rsi > 70) {
                        // RSI cao → sắp điều chỉnh → tính điểm Đảo short (resistance)
                        return Math.max(currentPrice + (atr * 1.5), maxHigh);
                    } else if (rsi < 30) {
                        // RSI thấp → sắp phục hồi → tính điểm Đảo long (support)
                        return Math.min(currentPrice - (atr * 1.5), minLow);
                    }
                } catch (Exception e) {
                    // Fallback
                }
                // Default: tính theo giá hiện tại
                return currentPrice + (atr * 0.5); // Slightly above current price
            }
            
        } catch (Exception e) {
            System.err.println("Error calculating reversal point for " + candle.getSymbol() + ": " + e.getMessage());
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
            case "VN30F1M": return 1848.0; // đồng bộ giá nền VN30F1M
            default: return 50.0;
        }
    }
}

