#!/bin/bash

echo "🚀 Building Spring Boot application for Railway..."

# Set Maven options for Railway
export MAVEN_OPTS="-Xmx1024m -XX:MaxPermSize=256m"

# Clean and build
echo "🔨 Running Maven build..."
mvn clean package -DskipTests -Dmaven.test.skip=true -Dmaven.compiler.source=11 -Dmaven.compiler.target=11

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if JAR file exists
    if [ -f "target/stock-prediction-system-1.0.0.jar" ]; then
        echo "✅ JAR file created: target/stock-prediction-system-1.0.0.jar"
        echo "📊 JAR size: $(du -h target/stock-prediction-system-1.0.0.jar | cut -f1)"
    else
        echo "❌ JAR file not found!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
