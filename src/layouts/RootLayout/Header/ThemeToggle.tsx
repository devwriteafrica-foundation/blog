import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"
import { Emoji } from "src/components/Emoji"
import useScheme from "src/hooks/useScheme"

type Props = {}

const ThemeToggle: React.FC<Props> = () => {
  const [scheme, setScheme] = useScheme()

  const handleClick = () => {
    setScheme(scheme === "light" ? "dark" : "light")
  }

  return (
    <StyledWrapper>
      {/* <Emoji>{scheme === "light" ? "☀️" : "🌙"}</Emoji> */}

      <Link href="/join">Join Community</Link>
    </StyledWrapper>
  )
}

export default ThemeToggle
const StyledWrapper = styled.div`
  cursor: pointer;

  a {
    border: 1px solid #133962; /* Blue border color */
    color: black; /* White text color */
    padding: 10px 15px; /* Padding for better spacing */
    text-align: center;
    width: 100%;
    margin-right: 10px;
    border-radius: 5px; /* Rounded corners */
    font-size: 16px; /* Larger font size */
    letter-spacing: 0.5px; /* Slight letter spacing */
    transition: all 0.3s ease; /* Smooth transition for hover effects */

    &:hover {
      background-color: #0056b3; /* Slightly darker blue on hover */
      border-color: #687c90;
      box-shadow: 0 2px 4px rgba(0, 123, 255, 0.5); /* Shadow for depth */
      color: white;
    }

    &:active {
      background-color: #004085; /* Even darker for active state */
      border-color: #004085;
    }

    &:focus {
      outline: none; /* Remove default focus outline */
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Custom focus shadow */
    }
  }
`
