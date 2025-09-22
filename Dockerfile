# Multi-stage build for Spring Boot application
FROM openjdk:11-jdk-slim as builder

# Set working directory
WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Install Maven and build the application
RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean package -DskipTests

# Runtime stage
FROM openjdk:11-jre-slim

# Set working directory
WORKDIR /app

# Copy the built JAR file
COPY --from=builder /app/target/stock-prediction-system-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=production

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
