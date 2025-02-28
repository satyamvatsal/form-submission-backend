const express = require("express");
const router = express.Router();
const { returnUsers } = require("../database/queries");
router.get("/students", async (req, res) => {
  const key = req.headers["admin-key"];
  if (key === process.env.ADMIN_KEY) {
    const data = await returnUsers();
    return res.status(200).json({ data });
  }
  return res.status(401).json({ message: "Invalid key" });
});

module.exports = router;
