import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export default mongoose.models.Bus || mongoose.model("Bus", busSchema);
