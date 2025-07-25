import express from "express";
import dotenv from "dotenv";
import { initDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

const PORT = process.env.PORT || 5001;

app.get("/api/health", async (req, res) => {
  res.status(200).json({ status: "ok" });
});

// build-in middleware
app.use(express.json());
app.use(rateLimiter);

app.use("/api/transactions", transactionsRoute);

// app.listen(5001, () => console.log(`Server is up and running on PORT:${PORT}`));

initDb().then(() => {
  app.listen(5001, () =>
    console.log(`Server is up and running on PORT:${PORT}`)
  );
});
