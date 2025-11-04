import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🧩 Routing Rules
app.use("/officer", createProxyMiddleware({ target: "http://officer-auth:3001", changeOrigin: true }));
app.use("/head", createProxyMiddleware({ target: "http://head-auth:3002", changeOrigin: true }));
app.use("/admin", createProxyMiddleware({ target: "http://admin-auth:3003", changeOrigin: true }));
app.use("/stats", createProxyMiddleware({ target: "http://statistics:3004", changeOrigin: true }));
app.use("/tracker", createProxyMiddleware({ target: "http://tracker:3005", changeOrigin: true }));
app.use("/nameplate", createProxyMiddleware({ target: "http://nameplate:3006", changeOrigin: true }));

app.get("/", (req, res) => {
    res.send("API Gateway is running 🚀");
});

app.listen(8080, () => console.log("Gateway running on port 8080"));