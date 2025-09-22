# 🔧 Khắc Phục Lỗi Build Railway

## ❌ **Lỗi Hiện Tại:**
Build process bị gián đoạn, không thể tạo JAR file

## 🎯 **Nguyên Nhân:**
1. Maven build timeout
2. Dependencies không được resolve đúng
3. Memory không đủ
4. Cấu hình build không tối ưu

## 🚀 **Giải Pháp:**

### **Bước 1: Sử dụng Cấu Hình Mới**

#### **1.1 nixpacks.toml (Tối ưu)**
```toml
[phases.setup]
nixPkgs = ["maven", "openjdk11"]

[phases.install]
cmds = ["mvn dependency:resolve"]

[phases.build]
cmds = ["mvn clean package -DskipTests -Dmaven.test.skip=true"]

[start]
cmd = "java -jar target/stock-prediction-system-1.0.0.jar"
```

#### **1.2 .mvn/maven.config**
```
-Dmaven.test.skip=true
-DskipTests=true
-Dmaven.compiler.source=11
-Dmaven.compiler.target=11
```

### **Bước 2: Deploy Lại**

#### **2.1 Commit Changes**
```bash
git add .
git commit -m "Fix Railway build configuration"
git push
```

#### **2.2 Railway Auto-Deploy**
- Railway sẽ sử dụng nixpacks.toml mới
- Build process được tối ưu
- Dependencies được resolve trước

### **Bước 3: Alternative Solutions**

#### **3.1 Sử dụng Docker (Nếu vẫn lỗi)**
```bash
# Rename Dockerfile
mv Dockerfile.railway Dockerfile

# Commit và push
git add .
git commit -m "Use Docker build"
git push
```

#### **3.2 Sử dụng Render (Alternative)**
1. Vào [render.com](https://render.com)
2. "New Web Service"
3. Connect GitHub
4. Cấu hình:
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/stock-prediction-system-1.0.0.jar`

## 🔍 **Troubleshooting**

### **Lỗi: Build timeout**
```
Error: Build timeout
```
**Giải pháp:**
- Sử dụng nixpacks.toml với phases riêng biệt
- Tối ưu Maven options
- Skip tests để giảm thời gian build

### **Lỗi: Dependencies not found**
```
Error: Dependencies not found
```
**Giải pháp:**
- Thêm `mvn dependency:resolve` trong install phase
- Kiểm tra pom.xml syntax
- Verify repository URLs

### **Lỗi: Memory insufficient**
```
Error: Out of memory
```
**Giải pháp:**
- Tăng MAVEN_OPTS memory
- Sử dụng Docker build
- Tối ưu dependencies

## 📋 **Environment Variables**

Thêm trong Railway dashboard:

### **Build Variables:**
```
MAVEN_OPTS=-Xmx1024m -XX:MaxPermSize=256m
MAVEN_CLEAN_GOAL=clean
MAVEN_BUILD_GOAL=package
```

### **Runtime Variables:**
```
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=<postgresql_url>
DB_USERNAME=<username>
DB_PASSWORD=<password>
FRONTEND_URL=https://your-frontend.vercel.app
```

## 🎯 **Build Process Flow**

### **Phase 1: Setup**
- Install Maven
- Install OpenJDK 11
- Setup environment

### **Phase 2: Install**
- Resolve dependencies
- Download packages
- Cache dependencies

### **Phase 3: Build**
- Clean previous build
- Compile source code
- Package JAR file
- Skip tests

### **Phase 4: Deploy**
- Start JAR file
- Health check
- Monitor logs

## ✅ **Checklist Khắc Phục**

- [ ] nixpacks.toml configuration đúng
- [ ] .mvn/maven.config được tạo
- [ ] railway.json đơn giản hóa
- [ ] Dependencies được resolve
- [ ] Build process tối ưu
- [ ] Memory settings phù hợp
- [ ] Code được push lên GitHub
- [ ] Railway auto-deploy thành công
- [ ] JAR file được tạo ra
- [ ] Application start thành công

## 🆘 **Alternative Platforms**

### **Render (Khuyến nghị)**
- Hỗ trợ Java/Spring Boot tốt
- PostgreSQL miễn phí
- Auto-deploy từ GitHub
- Chi phí: Miễn phí

### **Heroku**
- Hỗ trợ Java
- PostgreSQL addon
- Chi phí: Cần credit card

### **DigitalOcean App Platform**
- Hỗ trợ Java
- PostgreSQL database
- Chi phí: $5/tháng

## 📞 **Hỗ Trợ**

### **Railway Support:**
- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [GitHub Issues](https://github.com/railwayapp/cli/issues)

### **Maven Support:**
- [Maven Docs](https://maven.apache.org/guides)
- [Maven Troubleshooting](https://maven.apache.org/guides/introduction/introduction-to-troubleshooting.html)

### **Spring Boot Support:**
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Boot Guides](https://spring.io/guides)
