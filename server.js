const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const testConnection = require("./database/testConnection");
const studentRoutes = require("./routes/studentRoute");
const adminRoutes = require("./routes/adminRoute");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
