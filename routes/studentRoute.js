const express = require("express");
const router = express.Router();
const { isUserExists, insertStudent } = require("../database/queries");
const keepLogs = require("../utils/keepLogs");

router.post("/submit", async (req, res) => {
  try {
    keepLogs(req);
    const { name, email, scholar_no, phone, branch, year, college } = req.body;
    if (
      !email ||
      !name ||
      !scholar_no ||
      !phone ||
      !branch ||
      !year ||
      !college
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await isUserExists(email, phone);
    if (userExists === true) {
      console.log("user exists: ", userExists);
      return res
        .status(409)
        .json({ success: false, message: "Already registered" });
    }
    const result = await insertStudent(
      name,
      email,
      scholar_no,
      year,
      branch,
      phone,
      college,
    );
    if (result === true) {
      return res.status(202).json({
        success: result,
        message: "You are registered successfully!",
      });
      console.log(`User ${email} registered successfully.`);
    }
    return res.status(500).json({
      success: result,
      message: "Internal Server Error",
    });
  } catch (err) {
    console.log("Error inserting student data: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
router.get("/check", async (req, res) => {
  const { email, phone, scholar_no } = req.body;
  if (!email && !phone && !scholar_no) {
    return res
      .status(400)
      .json({ message: "Provide scholar number, email, or phone to check." });
  }
  const result = await isUserExists(email, scholar_no, phone);
  if (result === true) {
    const link = "https://chat.whatsapp.com/HZNIUnZvqFy2euT3TljWf2";
    return res.status(200).json({ exists: true, link });
  } else if (result === false) return res.status(200).json({ exists: false });
  else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
