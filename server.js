const express = require("express");
const cors = require("cors");
const connectMongo = require("./database/mongodb");
const studentRoutes = require("./routes/studentRoute");
const adminRoutes = require("./routes/adminRoute");
require("dotenv").config();
connectMongo();
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "https://admin.visioncse.tech",
  "https://visioncse.tech",
  "https://www.visioncse.tech",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: false }));
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
