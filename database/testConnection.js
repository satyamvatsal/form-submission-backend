const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    const res = await client.query("Select now();");
    console.log("Connected to PostgreSQL at: ", res.rows[0].now);
    client.release();
  } catch (err) {
    console.log("Database connection Error, ", err);
  } finally {
    pool.end();
  }
}
module.exports = testConnection();
