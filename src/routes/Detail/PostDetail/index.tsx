import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import styled from "@emotion/styled"
import usePostQuery from "src/hooks/usePostQuery"
import MarkdownRenderer from "src/components/MarkdownRenderer"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()
  
  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <article>
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          <MarkdownRenderer content={data.recordMap as unknown as string} />
          
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            {/* <CommentBox data={data} /> */}
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
 
`
