import express from "express";
import Route from "../models/Route.js";
import Bus from "../models/Bus.js";

const router = express.Router();

// Create a new route
router.post("/add", async (req, res) => {
  try {
    const { routeNumber, startLocation, endLocation, stops } = req.body;
    if (!routeNumber || !startLocation || !endLocation) {
      return res.status(400).json({ error: "routeNumber, startLocation and endLocation are required" });
    }
    const route = new Route({ routeNumber, startLocation, endLocation, stops });
    await route.save();
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all routes
router.get("/all", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search routes by single stop
router.get("/search", async (req, res) => {
  try {
    const { stop } = req.query;
    if (!stop) return res.status(400).json({ error: "Stop query is required" });
    const routes = await Route.find({ stops: { $regex: stop, $options: "i" } });
    const buses = await Bus.find({ route: { $in: routes.map(r => r._id) } }).populate("driver route");
    res.json({ routes, buses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search routes between two stops
router.get("/search-between", async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) return res.status(400).json({ error: "Both 'from' and 'to' stops are required" });
    const routes = await Route.find({ stops: { $all: [new RegExp(from, "i"), new RegExp(to, "i")] } });
    const buses = await Bus.find({ route: { $in: routes.map(r => r._id) } }).populate("driver route");
    res.json({ routes, buses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
