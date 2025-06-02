// import cookieParser from "cookie-parser";
// import cors from "cors";
// import express from "express";
// import { ENV } from "./config/ENV.js";
// import router from "./router.js";

// const app = express();

// app.use(cookieParser());

// const allowedOrigins = ["http://localhost:5173", ENV.CLIENT_URL];

// app.use(
//   cors({
//     origin: "https://myan-type.vercel.app",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/api/v1", router);

// const PORT = ENV.PORT;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { ENV } from "./config/ENV.js";
import router from "./router.js";

const app = express();

// Cookie parser first
app.use(cookieParser());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log("Origin:", req.headers.origin);
  console.log("Cookies:", req.cookies);
  next();
});

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", // Sometimes Vite uses different ports
  "https://myan-type.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("CORS check for origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

const PORT = ENV.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
