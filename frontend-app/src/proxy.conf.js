module.exports = {
  "/datafeed": {
    target: "http://localhost:3002",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/datafeed": "" }
  },
  // Một số client có thể gọi trực tiếp không có prefix
  "/history": {
    target: "http://localhost:3002",
    secure: false,
    changeOrigin: true
  },
  "/config": {
    target: "http://localhost:3002",
    secure: false,
    changeOrigin: true
  },
  "/symbols": {
    target: "http://localhost:3002",
    secure: false,
    changeOrigin: true
  },
  "/search": {
    target: "http://localhost:3002",
    secure: false,
    changeOrigin: true
  },
  "/time": {
    target: "http://localhost:3002",
    secure: false,
    changeOrigin: true
  },
  "/marks": {
    target: "http://localhost:3002",
    secure: false,
    changeOrigin: true
  },
  "/timescale_marks": {
    target: "http://localhost:3002",
    secure: false,
    changeOrigin: true
  },
  "/quotes": {
    target: "http://localhost:3002",
    secure: false,
    changeOrigin: true
  },
  "/storage": {
    target: "http://localhost:3003",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/storage": "" }
  },
  "/api": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/api": "/api" }
  },
  "/signals": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/signals": "/api/signals" }
  },
  "/technical-indicators": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/technical-indicators": "/api/technical-indicators" }
  },
  "/forecast": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/forecast": "/api/forecast" }
  },
  "/health": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/health": "/api/health" }
  }
};
