# 🔧 Khắc Phục Lỗi Railway: JAR File Not Found

## ❌ **Lỗi Hiện Tại:**
```
Error: Unable to access jarfile target/stock-prediction-system-1.0.0.jar
```

## 🎯 **Nguyên Nhân:**
1. Maven build không thành công
2. JAR file không được tạo ra
3. Railway không tìm thấy JAR file
4. Cấu hình build không đúng

## 🚀 **Giải Pháp:**

### **Bước 1: Test Build Local (2 phút)**
```bash
# Chạy script test build
chmod +x test-build.sh
./test-build.sh
```

Hoặc chạy thủ công:
```bash
mvn clean package -DskipTests
ls -la target/
```

### **Bước 2: Cập Nhật Railway Configuration**

#### **2.1 Sử dụng nixpacks.toml (Khuyến nghị)**
File `nixpacks.toml` đã được tạo với cấu hình:
```toml
[phases.setup]
nixPkgs = ["maven"]

[phases.install]
cmds = ["mvn clean package -DskipTests"]

[phases.build]
cmds = ["mvn clean package -DskipTests"]

[start]
cmd = "java -jar target/stock-prediction-system-1.0.0.jar"
```

#### **2.2 Sử dụng railway.json**
File `railway.json` đã được tạo với cấu hình:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "java -jar target/stock-prediction-system-1.0.0.jar",
    "healthcheckPath": "/api/health"
  }
}
```

### **Bước 3: Deploy Lại**

#### **3.1 Commit và Push Code**
```bash
git add .
git commit -m "Fix Railway JAR build configuration"
git push
```

#### **3.2 Railway Auto-Deploy**
- Railway sẽ tự động detect changes
- Sử dụng nixpacks.toml để build
- Tạo JAR file với Maven
- Deploy với start command

### **Bước 4: Kiểm Tra Logs**

#### **4.1 Build Logs**
1. Vào Railway dashboard
2. Click vào service "web"
3. Tab "Build Logs"
4. Kiểm tra Maven build process

#### **4.2 Deploy Logs**
1. Tab "Deploy Logs"
2. Kiểm tra JAR file được tạo
3. Kiểm tra start command

## 🔍 **Troubleshooting**

### **Lỗi: Maven not found**
```
Error: mvn: command not found
```
**Giải pháp:**
- Railway sẽ tự động install Maven
- Kiểm tra nixpacks.toml configuration

### **Lỗi: Build failed**
```
Error: Build failed
```
**Giải pháp:**
1. Kiểm tra pom.xml syntax
2. Check dependencies
3. Test build local trước

### **Lỗi: JAR file not found**
```
Error: Unable to access jarfile
```
**Giải pháp:**
1. Kiểm tra build logs
2. Verify JAR file được tạo
3. Check start command

### **Lỗi: Port binding**
```
Error: Port already in use
```
**Giải pháp:**
1. Railway tự động assign port
2. Sử dụng PORT environment variable
3. Check application.yml

## 📋 **Environment Variables**

Thêm các biến môi trường trong Railway:

### **Database:**
```
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=<postgresql_url>
DB_USERNAME=<username>
DB_PASSWORD=<password>
```

### **Frontend:**
```
FRONTEND_URL=https://your-frontend.vercel.app
```

### **Server:**
```
PORT=8080
SERVER_PORT=8080
```

## 🎯 **Alternative Solutions**

### **Phương án 1: Sử dụng Docker**
```bash
# Build Docker image
docker build -t stock-prediction .

# Run locally
docker run -p 8080:8080 stock-prediction
```

### **Phương án 2: Sử dụng Render**
1. Vào [render.com](https://render.com)
2. Deploy từ GitHub
3. Chọn "Web Service"
4. Cấu hình build command

### **Phương án 3: Sử dụng Heroku**
1. Tạo Procfile
2. Deploy với Heroku CLI
3. Sử dụng PostgreSQL addon

## ✅ **Checklist Khắc Phục**

- [ ] Test build local thành công
- [ ] JAR file được tạo ra
- [ ] nixpacks.toml configuration đúng
- [ ] railway.json configuration đúng
- [ ] Environment variables được set
- [ ] Code được push lên GitHub
- [ ] Railway auto-deploy thành công
- [ ] Application start thành công
- [ ] Health check pass

## 📞 **Hỗ Trợ**

### **Railway Support:**
- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [GitHub Issues](https://github.com/railwayapp/cli/issues)

### **Spring Boot Support:**
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Boot Guides](https://spring.io/guides)

### **Maven Support:**
- [Maven Docs](https://maven.apache.org/guides)
- [Maven Troubleshooting](https://maven.apache.org/guides/introduction/introduction-to-troubleshooting.html)
