const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  phone_number: { type: String, required: true },
  otp: { type: String, required: true },
  expires_at: { type: Date, required: true },
});

export const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);
