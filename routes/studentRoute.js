const express = require("express");
const router = express.Router();
const uploadToAzureBlob = require("../utils/uploadFiles");
const {
  isUserExists,
  insertStudent,
} = require("../controllers/studentController");
const keepLogs = require("../utils/keepLogs");
const uploadMiddleWare = require("../middlewares/uploadMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.post("/submit", uploadMiddleWare, async (req, res) => {
  try {
    keepLogs(req);
    const {
      name,
      email,
      scholar_no,
      phone,
      branch,
      github_profile,
      codeforces_profile,
      codechef_profile,
    } = req.body;
    console.log(req.body);
    if (!email || !name || !phone || !scholar_no) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await isUserExists(email, phone, scholar_no);
    if (userExists === true) {
      console.log("user exists: ", req.body);
      return res
        .status(409)
        .json({ success: false, message: "Already registered" });
    }

    let resumeUrl = null;
    let resumeLocalPath = "";
    if (req.file) {
      try {
        const blobName = `${Date.now()}-${req.file.originalname}`;
        resumeLocalPath = `${Date.now()}-${scholar_no}-${req.file.originalname}`;
        resumeUrl = await uploadToAzureBlob(req.file.path, blobName);
        console.log("Resume uploaded to Azure:", resumeUrl);
      } catch (err) {
        console.error("Error uploading resume to Azure:", err);
      }
    }
    const result = await insertStudent(
      name,
      email,
      scholar_no,
      branch,
      phone,
      resumeUrl,
      resumeLocalPath,
      github_profile,
      codeforces_profile,
      codechef_profile,
    );
    if (result === true) {
      console.log(`User ${email} registered successfully.`);
      return res.status(202).json({
        success: result,
        message: "You are registered successfully!",
      });
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
module.exports = router;
