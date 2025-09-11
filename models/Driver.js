import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  assignedBus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
});

export default mongoose.models.Driver || mongoose.model("Driver", driverSchema);
