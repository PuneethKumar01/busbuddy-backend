import express from "express";
import Driver from "../models/Driver.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Driver API is working 🚍" }));

router.post("/add", async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    const message = err.code === 11000 ? "Duplicate key error: unique field conflict" : err.message;
    res.status(400).json({ error: message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const drivers = await Driver.find().populate("assignedBus");
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
