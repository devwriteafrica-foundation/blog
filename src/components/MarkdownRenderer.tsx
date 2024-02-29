import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { TwitterTweetEmbed } from "react-twitter-embed"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx"
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript"
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json"
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash"
import React, { useState } from "react"
import { slugify } from "src/libs/utils"
import rehypeRaw from "rehype-raw"
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism" // Choose your theme
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons"

SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("bash", bash)

type MarkdownRendererProps = {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  )

  const copyToClipboard = (code: any) => {
    navigator.clipboard.writeText(code)
    setCopiedStates({ ...copiedStates, [code]: true })
    setTimeout(() => setCopiedStates({ ...copiedStates, [code]: false }), 2000)
  }
  const headingRenderer = (level: number) => {
    // eslint-disable-next-line react/display-name
    return ({ children, ...props }: any) => {
      const text = React.Children.toArray(children).join("")
      const id = slugify(text)

      let style = {}
      switch (level) {
        case 1:
          style = {
            fontWeight: "bold",
            fontSize: "35px",
            margin: "20px 0",
            fontFamily: "'Proxima Nova', sans-serif",
          }
          break
        case 2:
          style = {
            fontWeight: "bold",
            fontSize: "28px",
            margin: "20px 0",
            fontFamily: "'Proxima Nova', sans-serif",
          }
          break
        case 3:
          style = {
            fontWeight: "bold",
            fontSize: "23px",
            margin: "20px 0",
            fontFamily: "'Proxima Nova', sans-serif",
          }
          break
        case 4:
          style = {
            fontWeight: "bold",
            fontSize: "20px",
            margin: "20px 0",
            fontFamily: "'Proxima Nova', sans-serif",
          }
          break
        case 5:
          style = {
            fontWeight: "bold",
            fontSize: "18px",
            margin: "20px 0",
            fontFamily: "'Proxima Nova', sans-serif",
          }
          break
        case 6:
          style = {
            fontWeight: "bold",
            fontSize: "16px",
            margin: "24px 0",
            fontFamily: "'Proxima Nova', sans-serif",
          }
          break
      }

      return React.createElement(`h${level}`, { id, style, ...props }, children)
    }
  }

  return (
    <article className="prose max-w-none leading-normal prose-headings:font-medium">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        className="mb-8"
        components={{
          h1: headingRenderer(1),
          h2: headingRenderer(2),
          h3: headingRenderer(3),
          h4: headingRenderer(4),
          h5: headingRenderer(5),
          h6: headingRenderer(6),
          img: ({ node: _node, src, alt, ...props }: any) => {
            if (typeof src === "string") {
              return (
                <img
                  className="my-4 mx-auto"
                  alt={alt ?? "markdown image"}
                  {...props}
                  objectFit="cover" // or "contain", based on your needs
                  src={src}
                  style={{ width: "100%" }}
                />
              )
            } else {
              return null
            }
          },

          ul: ({ node, ...props }: any) => (
            <ul
              style={{
                marginLeft: "10px",
                lineHeight: "1.75",
                fontFamily: "'Proxima Nova', sans-serif",
                fontSize: "1.1rem",
                color: "#213343",
              }}
              {...props}
            />
          ),

          ol: ({ node, ...props }: any) => (
            <ol
              style={{
                marginLeft: "10px",
                fontFamily: "'Proxima Nova', sans-serif",
                lineHeight: "1.70",
                fontSize: "1.1rem",
                color: "#213343",
              }}
              {...props}
            />
          ),

          li: ({ node, ...props }: any) => (
            <li
              className="mb-2 text-base leading-relaxed"
              style={{
                marginLeft: "10px",
                lineHeight: 1.5,
                tabSize: 4,
                fontSize: "1.1rem",
                color: "#213343",
              }}
              {...props}
            />
          ),

          code: ({ node, inline, className, children, ...props }: any) => {
            const isInline = !children.includes("\n")
            const match = /language-(\w+)/.exec(className || "")
            const textToCopy = String(children).replace(/\n$/, "")
            const copied = copiedStates[textToCopy]

            return !isInline && match ? (
              <div style={{ position: "relative" }}>
                <SyntaxHighlighter style={materialDark} language={match[1]}>
                  {textToCopy}
                </SyntaxHighlighter>

                <button
                  onClick={() => copyToClipboard(textToCopy)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    cursor: "pointer",
                    padding: "5px",
                    borderRadius: "5px",
                    backgroundColor: "#dfdfe2",
                  }}
                >
                  {copied ? (
                    <>
                      <FontAwesomeIcon icon={faCheck} /> copied
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCopy} /> copy
                    </>
                  )}
                </button>
              </div>
            ) : (
              <code
                style={{
                  backgroundColor: "#dfdfe2",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  fontStyle: "italic",
                  fontWeight: "lighter",
                  fontFamily: "'Proxima Nova', sans-serif",
                  fontSize: "1.05rem",
                }}
              >
                {children}
              </code>
            )
          },

          p: ({ node, ...props }: any) => {
            const str = props.children[0]?.toString() ?? ""
            // if tweet use tweet embed
            if (str.startsWith("%[https://twitter.com/")) {
              // ['%[https://twitter.com/neorepo/status/1636728548080713728?s=20]'] -> tweetId = 1636728548080713728
              const tweetUrl = str.slice(2, -1)
              const tweetId = tweetUrl.split("/").pop()?.split("?")[0]

              if (typeof tweetId === "string") {
                return <TwitterTweetEmbed tweetId={tweetId} />
              } else {
                return <div>Error showing tweet</div>
              }
            }

            // if image use next image
            if (str.startsWith("![](")) {
              const imageUrl = str.slice(4, -1).split(" ")[0]
              if (imageUrl) {
                return (
                  <Image
                    src={imageUrl}
                    alt={""}
                    width={920}
                    height={640}
                    className="mx-auto"
                  />
                )
              } else {
                return <div>Error showing image</div>
              }
            }

            return (
              <p
                className="mb-6"
                style={{
                  fontFamily: "'Proxima Nova', sans-serif",
                  lineHeight: "1.70",
                  fontSize: "1.1rem",

                  color: "#213343",
                }}
                {...props}
              />
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
