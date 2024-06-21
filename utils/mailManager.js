require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const userDeleteMailOptions = (email, otp) => ({
  from: "Anzen Server<responseserver276@gmail.com>",
  to: email,
  subject: "Veryify OTP for account deletion",
  html: `
    <h1>Your OTP is: ${otp}</h1>
           <p>
           Please use this OTP to verify your request.
           </p>
    `,
});

// ADD MAIL OPTIONS FOR PASSWORD DELETION, PASSWORD UPDATE, WELCOME MAIL, FORGOT PASSWORD
module.exports = { transporter,userDeleteMailOptions };
