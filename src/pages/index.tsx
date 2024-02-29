import Feed from "src/routes/Feed"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "../types"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { GetStaticProps } from "next"
import { dehydrate } from "@tanstack/react-query"
import path from "path"
import fs from "fs"
import matter from "gray-matter"

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), "posts") // Replace with your directory path
  const posts = parseMarkdownFiles(postsDirectory)

  await queryClient.prefetchQuery(queryKey.posts(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const FeedPage: NextPageWithLayout = () => {
  const meta = {
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Feed />
    </>
  )
}

const parseMarkdownFiles = (directory: string) => {
  const files = fs.readdirSync(path.join(directory))
  const markDownPosts = files.filter((file) => file.endsWith(".md"))
  const posts = markDownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`${directory}/${fileName}`, "utf8")
    const matterResult = matter(fileContents)
    return {
      id: matterResult.data.id,
      date: matterResult.data.date,
      thumbnail: matterResult.data.thumbnail,
      type: matterResult.data.type,
      slug: matterResult.data.slug || fileName.replace(".md", ""),
      tags: matterResult.data.tags,
      author: matterResult.data.author,
      title: matterResult.data.title,
      status: matterResult.data.status,
      createdTime: matterResult.data.createdTime,
      fullWidth: matterResult.data.fullWidth,
    }
  })
  return posts
}

export default FeedPage
