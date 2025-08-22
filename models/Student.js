const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    scholar_no: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    branch: { type: String },
    resume_url: { type: String },
    resume_local_path: { type: String },
    github_profile: { type: String },
    codeforces_profile: { type: String },
    codechef_profile: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
