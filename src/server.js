import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "./config/ENV.js";
import router from "./router.js";

const app = express();

// When running behind a proxy (load balancer / reverse proxy) that terminates TLS,
// Express needs to trust the proxy so `req.secure` and `req.protocol` reflect the
// original request. This is required so our cookie helper can detect HTTPS.
app.set("trust proxy", 1);

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://myan-type.kyawmgmglwin.site",
  "http://www.myan-type.kyawmgmglwin.site",
  // allow whatever is configured in ENV.CLIENT_URL (could be https)
  ENV.CLIENT_URL,
  // also accept https versions just in case
  typeof ENV.CLIENT_URL === "string" && ENV.CLIENT_URL.replace(/^http:\/\//, "https://"),
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.get("/", (req, res) =>{
 res.send("hello")})

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});