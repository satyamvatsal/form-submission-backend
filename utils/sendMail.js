const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function sendMail(name, to) {
  const subject = "Subject: 🎉 Registration Successful - Event Details Inside";
  const htmlContent = `

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmed - Code-A-Thon 2025</title>
      <style>
        /* Reset some basic elements for consistent rendering */
        body, p, h1, h2, h3, ul, li {
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Segoe UI', sans-serif;
          background-color: #f7f7f7;
          color: #333;
          line-height: 1.6;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #28a745;
          color: #fff;
          padding: 20px 30px;
          text-align: center;
          position: relative;
        }
        .header img {
          width: 60px;
          height: 60px;
          position: absolute;
          left: 20px;
          top: 15px;
          border-radius: 50%;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          letter-spacing: 1px;
        }
        .content {
          padding: 30px;
        }
        .content h2 {
          color: #4F46E5;
          margin-bottom: 10px;
        }
        .info-box {
          background: #F0F4FF;
          border-left: 4px solid #4F46E5;
          padding: 15px;
          margin: 20px 0;
          border-radius: 6px;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          background-color: #28a745;
          color: #fff;
          padding: 12px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          margin-top: 20px;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #218838;
        }
        .faq {
          margin-top: 30px;
          border-top: 1px solid #eaeaea;
          padding-top: 20px;
          font-size: 14px;
        }
        .faq h3 {
          margin-bottom: 10px;
          color: #333;
        }
        .faq p {
          margin-bottom: 10px;
        }
        .footer {
          background: #f0f0f0;
          text-align: center;
          font-size: 13px;
          color: #888;
          padding: 15px;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
          }
          .header, .content, .footer {
            padding: 15px;
          }
          .header img {
            width: 50px;
            height: 50px;
          }
        }
      </style>
    </head>
    <body>

      <div class="container">
        <div class="header">
          <h1>Registration Confirmed for Code-A-Thon 2025!</h1>
        </div>

        <div class="content">
          <!-- Personalized greeting -->
          <h2>Hi ${name},</h2>
          <p>We're excited to inform you that your registration for the event has been successfully completed.</p>

          <div class="info-box">
            <p><strong>📅 Event:</strong> Online Coding Round</p>
            <p><strong>🕒 Date & Time:</strong> 14th April, 7:00 PM onwards</p>
            <p><strong>📍 Venue:</strong> Online (Details will be shared in the WhatsApp group)</p>
          </div>

          <p>This coding round is designed to test your problem-solving skills, logical thinking, and speed. The problems are curated to challenge both beginners and experienced coders.</p>

          <p>Join our official WhatsApp group for updates and last-minute instructions:</p>
          <a class="button" href="https://chat.whatsapp.com/HZNIUnZvqFy2euT3TljWf2" target="_blank">Join WhatsApp Group</a>

          <!-- Additional section for clarity -->
          <div class="faq">
            <h3>What to Expect?</h3>
            <p><strong>Before the event:</strong> We will send you further instructions and the link of the contest portal via email.</p>
            <p><strong>During the event:</strong> The contest portal will open precisely at the mentioned time. Ensure that your internet connection is stable.</p>
            <p><strong>After the event:</strong> Winners will be announced via email, and a post-event discussion will be held on our Whatsapp group.</p>
          </div>

        </div>

        <div class="footer">
          &copy; 2025 Vision CSE, MANIT Bhopal. All rights reserved.
          <br>
          <p>If you no longer wish to receive emails from us, you can
            <a href="https://visioncse.tech/unsubscribe?email=${to}" style="color: #4F46E5; text-decoration: underline;">
              unsubscribe here
            </a>.
          </p>
        </div>
      </div>

    </body>
    </html>

    `;
  const mailOptions = {
    from: process.env.MAIL_ID,
    to,
    subject,
    html: htmlContent,
    headers: {
      "List-Unsubscribe":
        "<https://visioncse.tech/unsubscribe?email=" +
        encodeURIComponent(to) +
        ">",
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.response}`);
    return true;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    return false;
  }
}

module.exports = sendMail;
