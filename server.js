import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import busRoutes from "./routes/busRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

dotenv.config();
const app = express();

// CORS - allow your frontend origin (adjust if deploying)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.use("/api/bus", busRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/route", routeRoutes);
app.use("/api/location", locationRoutes);

app.get("/", (req, res) => res.send("🚍 BusBuddy Backend is running!"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚍 Server running on port ${PORT}`));
