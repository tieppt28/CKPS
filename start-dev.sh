#!/bin/bash

echo "Starting Stock Prediction System Development Environment"
echo

echo "Starting Backend (Spring Boot)..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 10

echo "Starting Frontend (Angular)..."
cd ../frontend/client
npm install
npm start &
FRONTEND_PID=$!

echo
echo "Both services are starting..."
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:4200"
echo
echo "Press Ctrl+C to stop both services"

# Function to cleanup processes on exit
cleanup() {
    echo "Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

# Trap Ctrl+C
trap cleanup SIGINT

# Wait for processes
wait









