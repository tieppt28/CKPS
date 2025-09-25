# Hướng dẫn Tích hợp Chart với Phân tích Thị trường

## Cấu trúc Project

```
ChungKhoanPhaiSinh/
├── backend/                     # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                   # Angular Frontend (TradingView Chart)
│   └── client/
│       ├── src/
│       ├── package.json
│       └── angular.json
└── README.md
```

## Các Component đã tạo

### Frontend (Angular)
1. **ChartWithAnalysisComponent** - Component chính kết hợp chart và phân tích
2. **MarketAnalysisComponent** - Component hiển thị chỉ số kỹ thuật và tín hiệu
3. **BackendApiService** - Service kết nối với backend API

### Backend (Spring Boot)
1. **TechnicalIndicatorsController** - API cung cấp chỉ số kỹ thuật
2. **PredictionSignalController** - API cung cấp tín hiệu giao dịch

## Cách chạy Project

### 1. Chạy Backend
```bash
cd backend
mvn spring-boot:run
```
Backend sẽ chạy trên: http://localhost:8080

### 2. Chạy Frontend
```bash
cd frontend/client
npm install
npm start
```
Frontend sẽ chạy trên: http://localhost:4200

## API Endpoints

### Backend APIs
- `GET /api/technical-indicators` - Lấy chỉ số kỹ thuật mặc định (FPT)
- `GET /api/technical-indicators/{symbol}` - Lấy chỉ số kỹ thuật theo symbol
- `GET /api/signals/recent` - Lấy tín hiệu giao dịch gần đây
- `GET /health` - Health check

### Frontend Routes
- `/` - Trang chủ với chart và phân tích
- `/chart-with-analysis` - Trang chart với phân tích
- `/tabs-chart` - Trang chart với tabs
- `/mobile-chart` - Trang chart mobile

## Tính năng

### 1. TradingView Chart
- Biểu đồ giá cổ phiếu tương tác
- Các chỉ báo kỹ thuật
- Nhiều timeframe

### 2. Phân tích Thị trường
- **Chỉ số Kỹ thuật:**
  - RSI (Relative Strength Index)
  - EMA 20, EMA 50
  - MACD (Moving Average Convergence Divergence)
  - ATR (Average True Range)

- **Tín hiệu Giao dịch:**
  - Tín hiệu MUA/BÁN/ĐẢO CHIỀU
  - Độ tin cậy
  - Điểm đảo chiều
  - Thời gian tín hiệu

### 3. Real-time Updates
- Cập nhật dữ liệu mỗi 8 giây
- Tự động refresh tín hiệu và chỉ số

## Cấu hình Environment

### Development
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:4200`

### Production
- Backend: `https://web-production-1b13.up.railway.app`
- Frontend: Deploy trên Vercel

## Troubleshooting

### 1. CORS Issues
- Backend đã cấu hình CORS cho phép tất cả origins
- Kiểm tra URL trong environment files

### 2. API Connection Issues
- Kiểm tra backend có chạy không: `http://localhost:8080/health`
- Kiểm tra network tab trong browser dev tools

### 3. Font Awesome Icons không hiển thị
- Chạy `npm install` để cài đặt dependencies
- Kiểm tra angular.json đã include Font Awesome CSS

## Deploy

### Backend (Railway)
```bash
cd backend
# Deploy lên Railway với cấu hình hiện tại
```

### Frontend (Vercel)
```bash
cd frontend
# Deploy lên Vercel với Root Directory: client
```

## Lưu ý

1. **Backend phải chạy trước** frontend để API hoạt động
2. **CORS** đã được cấu hình để cho phép kết nối
3. **Environment variables** cần được cập nhật cho production
4. **Database** sử dụng H2 in-memory, dữ liệu sẽ mất khi restart









