import express from "express";
import Bus from "../models/Bus.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Bus API is working 🚍" }));

router.post("/add", async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const buses = await Bus.find().populate("driver route");
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
