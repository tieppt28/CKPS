package stockprediction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stockprediction.service.TrendForecastService;

import java.util.Map;

@RestController
@RequestMapping("/forecast")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:4200"})
public class TrendForecastController {

    @Autowired
    private TrendForecastService trendForecastService;

    @GetMapping("/{symbol}")
    public ResponseEntity<Map<String, Object>> forecast(@PathVariable String symbol,
                                                        @RequestParam(defaultValue = "3") int horizonDays) {
        return ResponseEntity.ok(trendForecastService.forecastShortTerm(symbol, Math.max(1, Math.min(7, horizonDays))));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> forecastDefault(@RequestParam(defaultValue = "FPT") String symbol,
                                                               @RequestParam(defaultValue = "3") int horizonDays) {
        return forecast(symbol, horizonDays);
    }
}


