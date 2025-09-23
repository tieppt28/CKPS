@echo off
echo Starting Stock Prediction System Development Environment
echo.

echo Starting Backend (Spring Boot)...
start "Backend" cmd /k "cd backend && mvn spring-boot:run"

echo Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo Starting Datafeed Server (Node - UDF, port 3002)...
start "Datafeed" cmd /k "cd datafeed-server && set PORT=3002 && npm install && npm start"

echo Starting Storage Server (Node - charts/studies, port 3003)...
start "Storage" cmd /k "cd storage-server && set PORT=3003 && npm install && npm start"

echo Starting Frontend (Angular)...
start "Frontend" cmd /k "cd frontend-app && npm install && npm start"

echo.
echo All services are starting...
echo Backend:   http://localhost:8080
echo Datafeed:  http://localhost:3002
echo Storage:   http://localhost:3003
echo Frontend:  http://localhost:4200
echo.
echo Press any key to exit...
pause > nul
