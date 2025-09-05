import express from "express";
import Location from "../models/Location.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Location API is working 📍" }));

// ✅ Update bus location
router.post("/update", async (req, res) => {
  try {
    const { bus, latitude, longitude } = req.body;
    const location = new Location({ bus, latitude, longitude });
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all locations
router.get("/all", async (req, res) => {
  try {
    const locations = await Location.find().populate("bus");
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get latest location of each bus
router.get("/latest", async (req, res) => {
  try {
    // aggregate to get the latest timestamp per bus
    const latestLocations = await Location.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$bus",
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
          timestamp: { $first: "$timestamp" },
        },
      },
    ]);

    res.json(latestLocations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
