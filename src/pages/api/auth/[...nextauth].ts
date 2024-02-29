// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import AppleProvider from "next-auth/providers/apple"
import { createClient } from "@supabase/supabase-js"
import { sendEmail } from "src/utils/nodemailer.config"

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      let { data: member, error: selectError } = await supabase
        .from("members")
        .select("*")
        .eq("email", user.email)
      if ((member?.length as number) < 1) {
        const { data, error } = await supabase
          .from("members")
          .insert([
            {
              userId: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            },
          ])
          .select()
        if (error) return false
        sendEmail({
          email: user.email,
          html: `
          <p>Hello ${user.name}</p>
         <p> Welcome to Devwrites Africa! Excited to have you onboard in our innovative community.</p> 
         <p>Connect with us on <a href="">Discord</a> for lively discussions, follow us on Twitter for the latest updates, and join our LinkedIn network to broaden your professional circle. Let's engage, learn, and grow together! 🚀🌍</p>
  
        <p>Thanks you,</p>
        <p>Clinton</p>
          `,
        })
      }
      return true
    },
  },
  //   events: {
  //     signIn: async ({ user, account, profile, isNewUser }) => {
  //         console.log(isNewUser)
  //       if (isNewUser) {
  //         // Logic to send email
  //         const email = user.email // Get user's email address
  //         const subject = "Welcome to [Your Service Name]"
  //         const text = "Thank you for signing up!"

  //         // Use your email service's API to send the email
  //         // Example: sendEmail(email, subject, text);
  //       }
  //     },
  //   },
})
