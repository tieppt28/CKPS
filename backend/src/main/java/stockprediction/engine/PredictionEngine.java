package stockprediction.engine;

import stockprediction.model.StockData;
import stockprediction.model.PredictionSignal;
import stockprediction.indicators.TechnicalIndicators;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

/**
 * Main prediction engine that analyzes stock data and generates trading signals
 */
@Service
public class PredictionEngine {

    private static final int EMA_20_PERIOD = 20;
    private static final int EMA_50_PERIOD = 50;
    private static final int RSI_PERIOD = 14;
    private static final int MACD_FAST = 12;
    private static final int MACD_SLOW = 26;
    private static final int MACD_SIGNAL = 9;

    // Parameters for reversal calculation
    private static final int SWING_LOOKBACK = 5;
    private static final int ATR_PERIOD = 14;
    private static final double ATR_K = 1.5; // buffer multiplier

    /**
     * Analyze stock data and generate prediction signals
     */
    public List<PredictionSignal> analyzeTrend(List<StockData> stockData) {
        List<PredictionSignal> signals = new ArrayList<>();

        if (stockData.size() < EMA_50_PERIOD + 1) {
            System.out.println(" Không đủ dữ liệu để phân tích. Cần ít nhất " + (EMA_50_PERIOD + 1) + " điểm dữ liệu.");
            return signals;
        }

        // Calculate technical indicators
        List<Double> ema20 = TechnicalIndicators.calculateEMA(stockData, EMA_20_PERIOD);
        List<Double> ema50 = TechnicalIndicators.calculateEMA(stockData, EMA_50_PERIOD);
        List<Double> rsi = TechnicalIndicators.calculateRSI(stockData, RSI_PERIOD);
        TechnicalIndicators.MACDResult macd = TechnicalIndicators.calculateMACD(stockData, MACD_FAST, MACD_SLOW, MACD_SIGNAL);
        List<Double> atr = calculateATR(stockData, ATR_PERIOD);

        // Analyze each data point (starting from index where we have all indicators)
        for (int i = EMA_50_PERIOD; i < stockData.size(); i++) {
            StockData currentData = stockData.get(i);

            Double currentEMA20 = ema20.get(i);
            Double currentEMA50 = ema50.get(i);
            Double previousEMA20 = ema20.get(i - 1);
            Double previousEMA50 = ema50.get(i - 1);
            Double currentRSI = rsi.get(i);
            Double macdLine = macd.getMacdLine().get(i);
            Double macdSignal = macd.getSignalLine().get(i);
            Double macdHist = macd.getHistogram().get(i);
            Double prevMacdLine = macd.getMacdLine().get(i - 1);
            Double prevMacdSignal = macd.getSignalLine().get(i - 1);
            Double prevMacdHist = macd.getHistogram().get(i - 1);
            Double currentATR = i < atr.size() ? atr.get(i) : null;

            if (currentEMA20 == null || currentEMA50 == null || currentRSI == null || currentATR == null ||
                    previousEMA20 == null || previousEMA50 == null) {
                continue;
            }

            // Check for EMA crossover signals with MACD confirmation
            boolean macdBullConfirm = false;
            boolean macdBearConfirm = false;
            double histSlope = 0.0;
            if (macdLine != null && macdSignal != null && prevMacdLine != null && prevMacdSignal != null) {
                macdBullConfirm = (prevMacdLine <= prevMacdSignal) && (macdLine > macdSignal);
                macdBearConfirm = (prevMacdLine >= prevMacdSignal) && (macdLine < macdSignal);
            }
            if (macdHist != null && prevMacdHist != null) {
                histSlope = macdHist - prevMacdHist;
            }

            double emaSpreadPct = (currentEMA50 != 0) ? Math.abs(currentEMA20 - currentEMA50) / Math.abs(currentEMA50) : 0.0;

            PredictionSignal signal = checkEMACrossover(
                    stockData,
                    i,
                    currentData,
                    currentEMA20,
                    currentEMA50,
                    previousEMA20,
                    previousEMA50,
                    currentRSI,
                    macdBullConfirm,
                    macdBearConfirm,
                    histSlope,
                    emaSpreadPct,
                    currentATR
            );

            if (signal != null) {
                signals.add(signal);
                continue;
            }

            // Check for overbought/oversold conditions
            signal = checkOverboughtOversold(stockData, i, currentData, currentRSI, currentATR);
            if (signal != null) {
                signals.add(signal);
            }
        }

        return signals;
    }

    /**
     * Check for EMA crossover signals
     */
    private PredictionSignal checkEMACrossover(List<StockData> data, int index, StockData currentData, double currentEMA20, double currentEMA50,
                                               double previousEMA20, double previousEMA50, double currentRSI,
                                               boolean macdBullConfirm, boolean macdBearConfirm,
                                               double histogramSlope, double emaSpreadPct, double currentATR) {

        // LONG setup
        if (previousEMA20 <= previousEMA50 && currentEMA20 > currentEMA50 && currentRSI > 55) {
            double confidence = calculateCompositeConfidence(true, currentRSI, 55, 100, emaSpreadPct, macdBullConfirm, histogramSlope);
            // Reversal = min(swingLow, close - k*ATR)
            double swingLow = findSwingLow(data, index, SWING_LOOKBACK);
            double atrStop = currentData.getClose() - ATR_K * currentATR;
            double reversalPoint = Math.min(swingLow, atrStop);
            String reason = String.format(
                    " TÍN HIỆU MUA: EMA 20 (%.2f) cắt lên EMA 50 (%.2f), RSI: %.2f > 55.%s%s;RSI:%.2f;Platform:EMA Cross;Reversal:%.2f",
                    currentEMA20, currentEMA50, currentRSI,
                    macdBullConfirm ? " Xác nhận bởi MACD cắt lên." : "",
                    histogramSlope > 0 ? " Histogram MACD tăng." : "",
                    currentRSI,
                    reversalPoint
            );
            return new PredictionSignal(currentData.getTimestamp(), PredictionSignal.SignalType.LONG,
                    confidence, reason, currentData.getClose());
        }

        // SHORT setup
        if (previousEMA20 >= previousEMA50 && currentEMA20 < currentEMA50 && currentRSI < 45) {
            double confidence = calculateCompositeConfidence(false, currentRSI, 0, 45, emaSpreadPct, macdBearConfirm, -histogramSlope);
            // Reversal = max(swingHigh, close + k*ATR)
            double swingHigh = findSwingHigh(data, index, SWING_LOOKBACK);
            double atrStop = currentData.getClose() + ATR_K * currentATR;
            double reversalPoint = Math.max(swingHigh, atrStop);
            String reason = String.format(
                    " TÍN HIỆU BÁN: EMA 20 (%.2f) cắt xuống EMA 50 (%.2f), RSI: %.2f < 45.%s%s;RSI:%.2f;Platform:EMA Cross;Reversal:%.2f",
                    currentEMA20, currentEMA50, currentRSI,
                    macdBearConfirm ? " Xác nhận bởi MACD cắt xuống." : "",
                    histogramSlope < 0 ? " Histogram MACD giảm." : "",
                    currentRSI,
                    reversalPoint
            );
            return new PredictionSignal(currentData.getTimestamp(), PredictionSignal.SignalType.SHORT,
                    confidence, reason, currentData.getClose());
        }

        return null;
    }

    /**
     * Overbought/oversold with reversal suggestion
     */
    private PredictionSignal checkOverboughtOversold(List<StockData> data, int index, StockData currentData, double currentRSI, double currentATR) {
        if (currentRSI > 70) {
            double confidence = calculateCompositeConfidence(true, currentRSI, 70, 100, 0.0, false, 0.0);
            double swingHigh = findSwingHigh(data, index, SWING_LOOKBACK);
            double atrStop = currentData.getClose() + ATR_K * currentATR;
            double reversalPoint = Math.max(swingHigh, atrStop);
            String reason = String.format(" CẢNH BÁO QUÁ MUA: RSI = %.2f > 70. Thị trường có thể điều chỉnh.;RSI:%.2f;Platform:RSI;Reversal:%.2f",
                    currentRSI, currentRSI, reversalPoint);
            return new PredictionSignal(currentData.getTimestamp(), PredictionSignal.SignalType.REVERSAL,
                    confidence, reason, currentData.getClose());
        }

        if (currentRSI < 30) {
            double confidence = calculateCompositeConfidence(false, currentRSI, 0, 30, 0.0, false, 0.0);
            double swingLow = findSwingLow(data, index, SWING_LOOKBACK);
            double atrStop = currentData.getClose() - ATR_K * currentATR;
            double reversalPoint = Math.min(swingLow, atrStop);
            String reason = String.format(" CƠ HỘI MUA VÀO: RSI = %.2f < 30. Thị trường có thể phục hồi.;RSI:%.2f;Platform:RSI;Reversal:%.2f",
                    currentRSI, currentRSI, reversalPoint);
            return new PredictionSignal(currentData.getTimestamp(), PredictionSignal.SignalType.REVERSAL,
                    confidence, reason, currentData.getClose());
        }

        return null;
    }

    /** ATR(14) calculation */
    private List<Double> calculateATR(List<StockData> data, int period) {
        List<Double> atr = new ArrayList<>(data.size());
        Double prevClose = null;
        Double trSum = 0.0;
        for (int i = 0; i < data.size(); i++) {
            StockData d = data.get(i);
            double tr;
            if (prevClose == null) {
                tr = d.getHigh() - d.getLow();
            } else {
                double hl = d.getHigh() - d.getLow();
                double hc = Math.abs(d.getHigh() - prevClose);
                double lc = Math.abs(d.getLow() - prevClose);
                tr = Math.max(hl, Math.max(hc, lc));
            }
            prevClose = d.getClose();

            if (i == 0) {
                atr.add(null);
            } else if (i < period) {
                trSum += tr;
                atr.add(null);
            } else if (i == period) {
                trSum += tr;
                atr.add(trSum / period);
            } else {
                double prevATR = atr.get(i - 1);
                double currATR = (prevATR * (period - 1) + tr) / period;
                atr.add(currATR);
            }
        }
        return atr;
    }

    private double findSwingLow(List<StockData> data, int index, int lookback) {
        double min = Double.MAX_VALUE;
        int start = Math.max(0, index - lookback);
        for (int i = start; i <= index; i++) {
            min = Math.min(min, data.get(i).getLow());
        }
        return min;
    }

    private double findSwingHigh(List<StockData> data, int index, int lookback) {
        double max = -Double.MAX_VALUE;
        int start = Math.max(0, index - lookback);
        for (int i = start; i <= index; i++) {
            max = Math.max(max, data.get(i).getHigh());
        }
        return max;
    }

    /**
     * Composite confidence using RSI position, EMA spread, and MACD confirmation.
     */
    private double calculateCompositeConfidence(boolean isUpper, double rsi, double minThreshold, double maxThreshold,
                                                double emaSpreadPct, boolean macdConfirm, double momentumScore) {
        double rsiComponent;
        if (isUpper) {
            rsiComponent = Math.max(0.0, Math.min(1.0, (rsi - minThreshold) / (maxThreshold - minThreshold)));
        } else {
            rsiComponent = Math.max(0.0, Math.min(1.0, (maxThreshold - rsi) / (maxThreshold - minThreshold)));
        }

        double emaComponent = Math.max(0.0, Math.min(1.0, emaSpreadPct / 0.02));
        double macdComponent = macdConfirm ? 1.0 : 0.0;
        double momentumComponent = Math.max(0.0, Math.min(1.0, Math.abs(momentumScore) / 0.1));

        double score = 0.55 * rsiComponent + 0.25 * emaComponent + 0.15 * macdComponent + 0.05 * momentumComponent;
        double confidence = 0.5 + score * 0.48;
        return Math.max(0.0, Math.min(0.98, confidence));
    }

    /**
     * Get current market sentiment based on latest indicators
     */
    public String getMarketSentiment(List<StockData> stockData) {
        if (stockData.size() < EMA_50_PERIOD + 1) {
            return " Không đủ dữ liệu để phân tích tâm lý thị trường";
        }

        List<Double> ema20 = TechnicalIndicators.calculateEMA(stockData, EMA_20_PERIOD);
        List<Double> ema50 = TechnicalIndicators.calculateEMA(stockData, EMA_50_PERIOD);
        List<Double> rsi = TechnicalIndicators.calculateRSI(stockData, RSI_PERIOD);

        int lastIndex = stockData.size() - 1;
        Double currentEMA20 = ema20.get(lastIndex);
        Double currentEMA50 = ema50.get(lastIndex);
        Double currentRSI = rsi.get(lastIndex);

        if (currentEMA20 == null || currentEMA50 == null || currentRSI == null) {
            return " Không thể xác định tâm lý thị trường";
        }

        StringBuilder sentiment = new StringBuilder();

        if (currentEMA20 > currentEMA50) {
            double trendStrength = ((currentEMA20 - currentEMA50) / currentEMA50) * 100;
            sentiment.append(String.format(" XU HƯỚNG TĂNG (EMA 20: %.2f > EMA 50: %.2f, chênh lệch: +%.2f%%). ",
                    currentEMA20, currentEMA50, trendStrength));
        } else {
            double trendStrength = ((currentEMA50 - currentEMA20) / currentEMA50) * 100;
            sentiment.append(String.format(" XU HƯỚNG GIẢM (EMA 20: %.2f < EMA 50: %.2f, chênh lệch: -%.2f%%). ",
                    currentEMA20, currentEMA50, trendStrength));
        }

        if (currentRSI > 70) {
            sentiment.append(String.format(" QUÁ MUA (RSI: %.2f) - Cần cảnh giác với điều chỉnh", currentRSI));
        } else if (currentRSI < 30) {
            sentiment.append(String.format("QUÁ BÁN (RSI: %.2f) - Cơ hội mua vào tiềm năng", currentRSI));
        } else if (currentRSI > 50) {
            sentiment.append(String.format(" ĐỘNG LỰC TÍCH CỰC (RSI: %.2f) - Thị trường khỏe mạnh", currentRSI));
        } else {
            sentiment.append(String.format(" TRUNG TÍNH (RSI: %.2f) - Chờ tín hiệu rõ ràng hơn", currentRSI));
        }

        return sentiment.toString();
    }
}
