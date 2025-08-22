const { Pool } = require("pg");
const { checkout } = require("../routes/studentRoute");
const mongoose = require("mongoose");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function insertStudent(
  name,
  email,
  scholar_no,
  year,
  branch,
  phone,
  college,
) {
  try {
    const query = `
                        INSERT INTO students (scholar_no, name, email, phone, branch, year, college)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        RETURNING *;
    `;
    const values = [scholar_no, name, email, phone, branch, year, college];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) return true;
    return false;
  } catch (err) {
    console.log("Error while inserting data", err);
    return false;
  }
}
async function isUserExists(email, phone) {
  try {
    const checkQuery = `
                  SELECT 1 FROM students WHERE email = $1 OR phone = $2 LIMIT 1;
              `;
    const checkResult = await pool.query(checkQuery, [email, phone]);
    if (checkResult.rows.length > 0) {
      return true;
    } else return false;
  } catch (err) {
    console.log("Error while checking user: ", err);
    throw Error("DB error");
  }
}
async function returnUsers() {
  try {
    const query = `SELECT * FROM students`;
    const allStudents = await pool.query(query);
    return allStudents.rows;
  } catch (err) {
    console.log(err);
    return -1;
  }
}
module.exports = { insertStudent, isUserExists, returnUsers };
