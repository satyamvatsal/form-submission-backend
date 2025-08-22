const express = require("express");
const router = express.Router();
const fastcsv = require("fast-csv");
const keepLogs = require("../utils/keepLogs");
const {
  returnUsers,
  returnUsersCSV,
} = require("../controllers/studentController");

router.get("/students", async (req, res) => {
  const key = req.headers["admin-key"];
  if (key === process.env.ADMIN_KEY) {
    const data = await returnUsers();
    return res.status(200).json({ data });
  }
  return res.status(401).json({ message: "Invalid key" });
});

router.get("/download-csv", async (req, res) => {
  try {
    const key = req.headers["admin-key"];
    console.log(key);
    if (key === process.env.ADMIN_KEY) {
      const data = await returnUsersCSV();
      res.setHeader("Content-Disposition", "attachment; filename=users.csv");
      res.setHeader("Content-Type", "text/csv");
      const csvStream = fastcsv.format({ headers: true });
      csvStream.pipe(res);
      if (data.length > 0) data.forEach((row) => csvStream.write(row));
      csvStream.end();
    } else {
      return res.status(401).json({ message: "Invalid key" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
