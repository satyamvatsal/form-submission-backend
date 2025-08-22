const multer = require("multer");
const path = require("path");
const fs = require("fs");

const backupDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, backupDir);
  },
  filename: function (req, file, cb) {
    const { scholar_no } = req.body;
    const uniqueSuffix = Date.now() + "-" + scholar_no;
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const mimetype = file.mimetype === "application/pdf";
    const extname = path.extname(file.originalname).toLowerCase() === ".pdf";

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only PDF files are allowed."));
  },
});

const uploadMiddleware = (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large! Max size is 5MB.",
        });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = uploadMiddleware;
