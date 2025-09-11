import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  stops: [{ type: String }],
});

export default mongoose.models.Route || mongoose.model("Route", routeSchema);
