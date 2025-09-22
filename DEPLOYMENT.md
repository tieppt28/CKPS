# 🚀 Hướng Dẫn Deploy Miễn Phí

## 📋 Tổng Quan
Project này sử dụng:
- **Backend**: Spring Boot (Java 11) + PostgreSQL
- **Frontend**: React.js với TradingView charts

## 🎯 Phương Án Deploy Miễn Phí

### 1. Backend - Railway (Khuyến nghị)
**Ưu điểm**: Dễ sử dụng, hỗ trợ PostgreSQL miễn phí, auto-deploy từ GitHub

#### Bước 1: Chuẩn bị
1. Tạo tài khoản tại [Railway.app](https://railway.app)
2. Kết nối GitHub repository

#### Bước 2: Deploy Backend
1. Tạo project mới trên Railway
2. Chọn "Deploy from GitHub repo"
3. Chọn repository này
4. Railway sẽ tự động detect Spring Boot app
5. Thêm PostgreSQL database:
   - Vào project dashboard
   - Click "New" → "Database" → "PostgreSQL"
6. Cấu hình environment variables:
   ```
   SPRING_PROFILES_ACTIVE=production
   DATABASE_URL=<từ PostgreSQL service>
   DB_USERNAME=<từ PostgreSQL service>
   DB_PASSWORD=<từ PostgreSQL service>
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

### 2. Frontend - Vercel (Khuyến nghị)
**Ưu điểm**: Tốc độ nhanh, CDN toàn cầu, miễn phí

#### Bước 1: Chuẩn bị
1. Tạo tài khoản tại [Vercel.com](https://vercel.com)
2. Kết nối GitHub repository

#### Bước 2: Deploy Frontend
1. Import project từ GitHub
2. Chọn thư mục `frontend`
3. Cấu hình build settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Thêm environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-domain.railway.app/api
   ```

## 🔄 Alternative Options

### Backend Alternatives:
- **Render**: [render.com](https://render.com) - Có PostgreSQL miễn phí
- **Heroku**: [heroku.com](https://heroku.com) - Cần credit card cho PostgreSQL

### Frontend Alternatives:
- **Netlify**: [netlify.com](https://netlify.com) - Tương tự Vercel
- **GitHub Pages**: Miễn phí nhưng chỉ static

## 🛠️ Local Development

### Chạy Backend:
```bash
# Trong thư mục gốc
mvn spring-boot:run
```

### Chạy Frontend:
```bash
# Trong thư mục frontend
cd frontend
npm install
npm start
```

### Chạy cả hai:
```bash
# Trong thư mục frontend
npm run start:all
```

## 📝 Lưu Ý Quan Trọng

1. **Database**: H2 chỉ dùng cho development, production cần PostgreSQL
2. **CORS**: Đã cấu hình cho production domains
3. **Environment Variables**: Nhớ cập nhật URLs sau khi deploy
4. **SSL**: Cả Railway và Vercel đều hỗ trợ HTTPS miễn phí

## 🔧 Troubleshooting

### Backend không kết nối database:
- Kiểm tra environment variables
- Đảm bảo PostgreSQL service đang chạy
- Check logs trên Railway dashboard

### Frontend không gọi được API:
- Kiểm tra REACT_APP_API_URL
- Kiểm tra CORS configuration
- Kiểm tra network tab trong browser

## 📞 Hỗ Trợ
Nếu gặp vấn đề, hãy check:
1. Railway logs
2. Vercel function logs  
3. Browser console
4. Network requests
