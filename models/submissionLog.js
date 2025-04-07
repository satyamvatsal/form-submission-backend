const mongoose = require("mongoose");

const SubmissionLogSchema = new mongoose.Schema({
  name: String,
  email: String,
  scholar_no: String,
  phone: String,
  branch: String,
  year: String,
  college: String,
  ip: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SubmissionLog", SubmissionLogSchema);
