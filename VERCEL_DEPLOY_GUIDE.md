# 🚀 Hướng Dẫn Deploy Frontend lên Vercel

## 📋 Tổng Quan
Deploy React app (frontend) lên Vercel - miễn phí, nhanh, và dễ sử dụng.

## 🎯 Bước 1: Chuẩn Bị

### 1.1 Tạo tài khoản Vercel
1. Vào [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Chọn **"Continue with GitHub"** (khuyến nghị)
4. Authorize Vercel truy cập GitHub repositories

### 1.2 Đảm bảo code đã push lên GitHub
```bash
# Nếu chưa có Git repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```

## 🚀 Bước 2: Deploy Project

### 2.1 Import Project
1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Chọn **"Import Git Repository"**
4. Chọn repository chứa project của bạn
5. Click **"Import"**

### 2.2 Cấu hình Project Settings
Khi Vercel detect project, bạn sẽ thấy:

**Framework Preset**: `Create React App` ✅ (tự động detect)

**Root Directory**: 
- Thay đổi từ `/` thành `/frontend`
- Hoặc click **"Edit"** và chọn thư mục `frontend`

**Build and Output Settings**:
- **Build Command**: `npm run build` (giữ nguyên)
- **Output Directory**: `build` (giữ nguyên)
- **Install Command**: `npm install` (giữ nguyên)

### 2.3 Environment Variables
Trước khi deploy, thêm environment variables:

1. Trong project settings, click **"Environment Variables"**
2. Thêm các biến sau:

```
REACT_APP_API_URL = https://your-backend-domain.railway.app/api
GENERATE_SOURCEMAP = false
NODE_ENV = production
```

**Lưu ý**: Thay `your-backend-domain.railway.app` bằng URL backend thực tế

### 2.4 Deploy
1. Click **"Deploy"**
2. Vercel sẽ tự động:
   - Install dependencies
   - Build project
   - Deploy lên CDN toàn cầu
3. Chờ 2-3 phút để hoàn thành

## ✅ Bước 3: Kiểm Tra Deployment

### 3.1 Truy cập Website
- Vercel sẽ cung cấp URL: `https://your-project-name.vercel.app`
- Click vào URL để xem website

### 3.2 Kiểm tra Console
1. Mở Developer Tools (F12)
2. Vào tab **Console**
3. Kiểm tra có lỗi nào không

### 3.3 Kiểm tra Network
1. Vào tab **Network**
2. Reload trang
3. Kiểm tra API calls có thành công không

## 🔧 Troubleshooting

### Lỗi Build Failed
```
Error: Build failed
```
**Giải pháp**:
1. Kiểm tra `package.json` có đúng không
2. Thử chạy `npm run build` local trước
3. Check logs trong Vercel dashboard

### Lỗi 404 khi truy cập routes
```
Cannot GET /dashboard
```
**Giải pháp**:
1. Đảm bảo có file `vercel.json` trong thư mục frontend
2. Kiểm tra React Router configuration

### API không kết nối được
```
Network Error: Failed to fetch
```
**Giải pháp**:
1. Kiểm tra `REACT_APP_API_URL` environment variable
2. Đảm bảo backend đã deploy và chạy
3. Kiểm tra CORS configuration

### Website trắng (Blank Page)
**Giải pháp**:
1. Kiểm tra Console errors
2. Đảm bảo `index.html` có đúng content
3. Check build output trong Vercel logs

## 🎨 Custom Domain (Tùy chọn)

### Thêm Custom Domain
1. Vào project settings
2. Click **"Domains"**
3. Thêm domain của bạn
4. Cấu hình DNS records theo hướng dẫn

## 📊 Monitoring & Analytics

### Vercel Analytics
1. Vào project dashboard
2. Click **"Analytics"**
3. Xem traffic, performance metrics

### Function Logs
1. Vào **"Functions"** tab
2. Xem real-time logs
3. Debug production issues

## 🔄 Auto-Deploy

### GitHub Integration
- Mỗi khi push code lên GitHub
- Vercel tự động build và deploy
- Preview deployments cho pull requests

### Manual Deploy
1. Vào project dashboard
2. Click **"Deployments"**
3. Click **"Redeploy"** nếu cần

## 💡 Tips & Best Practices

### 1. Environment Variables
- Luôn set `GENERATE_SOURCEMAP=false` cho production
- Sử dụng `REACT_APP_` prefix cho client-side variables

### 2. Performance
- Vercel tự động optimize images
- CDN toàn cầu cho tốc độ nhanh
- Automatic HTTPS

### 3. Security
- Không commit `.env` files
- Sử dụng Vercel environment variables
- Enable security headers

## 🆘 Hỗ Trợ

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [React on Vercel](https://vercel.com/guides/deploying-react-with-vercel)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/vercel/vercel/issues)

## 📞 Liên Hệ
Nếu gặp vấn đề, hãy:
1. Check Vercel function logs
2. Kiểm tra browser console
3. Test API endpoints riêng biệt
4. Verify environment variables
