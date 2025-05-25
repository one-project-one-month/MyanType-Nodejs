import express from "express";
import cors from "cors";
import router from "./router.js";
import { ENV } from "./config/ENV.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

const PORT = ENV.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
