import { Application } from "express";
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: Application) {
  app.use(
    "/ws",
    createProxyMiddleware({
      target: "http://localhost:8080", // 백엔드 WebSocket 서버 주소
      ws: true, // WebSocket 지원 활성화
      changeOrigin: true, // CORS 문제 해결
      logLevel: "debug", // 디버그 정보 표시 (선택)
    })
  );
};
