"use strict"
const nodemailer = require("nodemailer")

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "hello@devwriteafrica.com",
    pass: "1234cisco",
  },
})

// Reusable email sending function
export async function sendEmail({ to, html }: any) {
  const info = await transporter.sendMail({
    from: "easeplan.team@gmail.com",
    to,
    subject: "Welcome to the Devwrite Africa community!🥳",
    html,
  })
  console.log("Message sent: %s", info.messageId)
}