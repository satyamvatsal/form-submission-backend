const Student = require("../models/Student");

async function insertStudent(
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
) {
  try {
    const student = new Student({
      scholar_no,
      name,
      email,
      phone,
      branch,
      resume_url: resumeUrl,
      resume_local_path: resumeLocalPath,
      github_profile,
      codeforces_profile,
      codechef_profile,
    });

    await student.save();
    return true;
  } catch (err) {
    console.error("Error while inserting data:", err);
    return false;
  }
}

async function isUserExists(email, phone, scholar_no) {
  try {
    const user = await Student.findOne({
      $or: [{ email }, { phone }, { scholar_no }],
    });

    return !!user;
  } catch (err) {
    console.error("Error while checking user:", err);
    throw new Error("DB error");
  }
}

async function returnUsers() {
  try {
    const students = await Student.find({});
    return students;
  } catch (err) {
    console.error("Error fetching students:", err);
    return -1;
  }
}

async function returnUsersCSV() {
  try {
    const students = await Student.find(
      {},
      {
        _id: 0,
        name: 1,
        scholar_no: 1,
        phone: 1,
        email: 1,
        branch: 1,
        resume_url: 1,
        github_profile: 1,
        codeforces_profile: 1,
        codechef_profile: 1,
      },
    ).lean();
    return students;
  } catch (err) {
    console.error("Error fetching students:", err);
    return -1;
  }
}
module.exports = { insertStudent, isUserExists, returnUsers, returnUsersCSV };
