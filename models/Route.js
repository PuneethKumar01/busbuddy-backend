import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true }, // 🚫 no "unique: true"
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  stops: [{ type: String }],
});

export default mongoose.model("Route", routeSchema);
