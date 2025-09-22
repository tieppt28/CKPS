#!/bin/bash

echo "🧪 Testing Maven build process..."

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven not found. Please install Maven first."
    exit 1
fi

echo "✅ Maven found"

# Clean and build
echo "🔨 Cleaning and building project..."
mvn clean package -DskipTests

# Check if JAR file exists
JAR_FILE="target/stock-prediction-system-1.0.0.jar"
if [ -f "$JAR_FILE" ]; then
    echo "✅ JAR file created successfully: $JAR_FILE"
    echo "📊 JAR file size: $(du -h $JAR_FILE | cut -f1)"
    
    # Test if JAR is executable
    if java -jar "$JAR_FILE" --help &> /dev/null; then
        echo "✅ JAR file is executable"
    else
        echo "⚠️  JAR file may not be executable"
    fi
else
    echo "❌ JAR file not found: $JAR_FILE"
    echo "📋 Available files in target directory:"
    ls -la target/ 2>/dev/null || echo "Target directory not found"
    exit 1
fi

echo ""
echo "🎉 Build test passed! Ready for Railway deployment."
echo ""
echo "📋 Next steps:"
echo "1. Commit and push changes to GitHub"
echo "2. Railway will automatically redeploy"
echo "3. Check Railway logs for any issues"
