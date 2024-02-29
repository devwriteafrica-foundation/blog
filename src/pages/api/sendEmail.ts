import { sendEmail } from "src/utils/nodemailer.config"

import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
  message: string
  error?: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    sendEmail({
      to: req.body.email,
      html: `
      <p>Hello ${req.body.name},</p>

      <p>Welcome to Devwrites Africa! We're thrilled to have you onboard our innovative community.</p> 
      
      <p>Join our discussions on <a href="https://discord.gg/2TDfbF3k">Discord</a>, and follow us on <a href="https://twitter.com/devwritesafrica">Twitter</a> for updates. Let's engage, learn, and grow together! 🚀</p>
      
      <p>Thank you,</p>
      <p>Clinton</p>
        `,
    })
    res.status(200).json({
      message: "Email sent!",
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error occured",
    })
  }
}
