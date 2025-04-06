const { Pool } = require("pg");
const { checkout } = require("../routes/studentRoute");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function insertStudent(
  name,
  email,
  scholar_no,
  section,
  branch,
  phone,
  college,
) {
  try {
    const query = `
                        INSERT INTO students (scholar_no, name, email, phone, branch, section,college)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        RETURNING *;
    `;
    const values = [scholar_no, name, email, phone, branch, section, college];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) return true;
    return false;
  } catch (err) {
    console.log("Error while inserting data", err);
    return false;
  }
}
async function isUserExists(email, scholar_no, phone) {
  try {
    const checkQuery = `
                  SELECT * FROM students WHERE scholar_no = $1 OR email = $2 OR phone = $3;
              `;
    const checkResult = await pool.query(checkQuery, [
      scholar_no,
      email,
      phone,
    ]);
    if (checkResult.rows.length > 0) {
      return true;
    } else return false;
  } catch (err) {
    console.log("Error while checking user: ", err);
    return -1;
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
