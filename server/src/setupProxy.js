import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {  
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.SPOG_API_URL || "http://localhost:8083",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      logLevel: process.env.DEBUG ? "debug" : "info",      
      onProxyRes: (proxyRes, req, res) => {
        const includesJsonHeaders =
          req.headers.accept?.includes("application/json");
        if (
          (!includesJsonHeaders && proxyRes.statusCode === 401) ||
          (!includesJsonHeaders && proxyRes.statusMessage === "Unauthorized")
        ) {
          res.redirect("/");
        }
      },
    })
  );
}
