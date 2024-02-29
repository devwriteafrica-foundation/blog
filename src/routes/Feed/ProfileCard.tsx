import { CONFIG } from "site.config"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"
import { Emoji } from "src/components/Emoji"
import Link from "next/link"

type Props = {}

const ProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      {/* <div className="title">
        <Emoji>💻</Emoji> Profile
      </div> */}
      <div className="content">
        <div className="top">
          <Image src="/android-chrome-384x384.png" fill alt="" />
        </div>
        <div className="mid">
          <h4>Devwrites is a community of talented African developers passionate about technical writing.</h4>
          <p>
            {" "}
            We&apos;re a place where African coders, ui/ux designers share, stay up-to-date and grow
            their careers.
          </p>
          <Link href={"/join"}>Join Community</Link>
          {/* <div className=" name">{CONFIG.profile.name}</div>
          <div className="role">{CONFIG.profile.role}</div>
          <div className="text-sm mb-2">{CONFIG.profile.bio}</div> */}
        </div>
      </div>
    </StyledWrapper>
  )
}

export default ProfileCard

const StyledWrapper = styled.div`
  a {
    border: 1px solid #133962; /* Blue border color */
    background-color: #133962; /* Blue background */
    color: white; /* White text color */
    padding: 10px 15px; /* Padding for better spacing */
    text-align: center;
    width:100%;
    border-radius: 5px; /* Rounded corners */
    font-size: 16px; /* Larger font size */
    font-weight: bold; /* Bold font weight */
    letter-spacing: 0.5px; /* Slight letter spacing */
    transition: all 0.3s ease; /* Smooth transition for hover effects */

    &:hover {
      background-color: #0056b3; /* Slightly darker blue on hover */
      border-color: #0056b3;
      box-shadow: 0 2px 4px rgba(0, 123, 255, 0.5); /* Shadow for depth */
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
  > .title {
    padding: 0.25rem;
    margin-bottom: 0.75rem;
  }
  > .content {
    margin-bottom: 2.25rem;
    border-radius: 1rem;
    width: 100%;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    @media (min-width: 768px) {
      padding: 1rem;
    }
    @media (min-width: 1024px) {
      padding: 1rem;
    }
    .top {
      position: relative;
      width: 100%;
      &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }
    .mid {
      display: flex;
      padding: 0.5rem;
      flex-direction: column;
      align-items: center;
      .name {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-style: italic;
        font-weight: 700;
      }
      .role {
        margin-bottom: 1rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: ${({ theme }) => theme.colors.gray11};
      }
      .bio {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }
  }
`
