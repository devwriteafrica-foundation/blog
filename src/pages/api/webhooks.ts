// In your server-side code (e.g., an API route in Next.js)
import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
  success: boolean
  error?: any
}
// Function to send notification to Discord
async function sendDiscordNotification(blogTitle: string, blogLink: string) {
  const webhookUrl =
    "https://discord.com/api/webhooks/1193501063937015860/QTEzUDVzyxzgyLhOyFO5Hod5G5kEJOIvT-MYNqLlbql4h2BnwbrwAdkKPk8wYjPpLk2n"

  try {
    await axios.post(webhookUrl, {
      content: `New Blog Published: **${blogTitle}**
Read it here: ${blogLink}`,
    })

    console.log("Discord notification sent successfully!")
  } catch (error: any) {
    console.error("Error sending Discord notification:", error.message)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Process blog publication logic here...

    // Assuming you have the blog title and link
    const blogTitle = "New Blog Title"
    const blogLink = "https://yourblog.com/new-blog"

    // Send Discord notification
    await sendDiscordNotification(blogTitle, blogLink)

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    })
  }
}
