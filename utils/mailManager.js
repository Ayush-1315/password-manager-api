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

const userDeletedMailOptions=(email)=>({
  from: "Anzen Server<responseserver276@gmail.com>",
  to: email,
  subject: "Account Deleted !",
  html: `
    <h1>Your account associated with ${email} has been removed from Anzen Database</h1>    `,
})

//Welcome mail

const welcomeMailOptions=(email)=>({
  from: "Anzen Server<responseserver276@gmail.com>",
  to: email,
  subject: "Welcome to the Anzen Server !",
  html: `
    <h1>Welcome to Anzen Server</h1>    `,
})
// ADD MAIL OPTIONS  FORGOT PASSWORD
module.exports = { transporter,userDeleteMailOptions,userDeletedMailOptions,welcomeMailOptions };
