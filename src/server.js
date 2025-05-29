import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { ENV } from "./config/ENV.js";
import router from "./router.js";

const app = express();

const whitelist = [ENV.CLIENT_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cookieParser());
app.use(
  cors({
    corsOptions,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
