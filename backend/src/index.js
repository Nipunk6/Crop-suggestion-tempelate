import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import cors from "cors";
dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`connectin error`);
  });
