const SubmissionLog = require("../models/submissionLog");

function keepLogs(req) {
  try {
    const { name, email, scholar_no, phone, branch, year, college } = req.body;
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      null;
    const userAgent = req.headers["user-agent"];
    SubmissionLog.create({
      name,
      email,
      scholar_no,
      phone,
      branch,
      year,
      college,
      ip,
      userAgent,
    });
  } catch (err) {
    console.log("error while logging: ", err);
  }
}
module.exports = keepLogs;
