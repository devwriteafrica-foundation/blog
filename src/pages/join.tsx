import React, { useState } from "react"
import styled from "@emotion/styled"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
)

const StyledFormComponent = () => {
  const [notARobbot, setNotARobbot] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  /**
   * Sends a welcome email.
   * @param {string} email - The email address of the recipient.
   * @param {string} name - The name of the recipient.
   * @returns {Promise} A promise that resolves with the API response.
   */
  async function sendWelcomeEmail(email: string, name: string) {
    try {
      // Make the API call to send the welcome email
      const response = await axios.post("/api/sendEmail", { email, name })

      // Return the API response
      return response
    } catch (error: any) {
      // Handle any errors that occur during the API call
      console.error(`Error sending welcome email: ${error.message}`)
      throw error // Re-throw the error for further handling, if needed
    }
  }
  function onChange(value: any) {
    if (value) {
      setNotARobbot(true)
    }
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    careerPath: "",
    experience: "",
    publishAt: "",
    whyJoin: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Check if the member already exists
      let { data: existingMember, error: fetchError } = await supabase
        .from(process.env.NEXT_PUBLIC_SUPABASE_TABLE as string)
        .select("*")
        .eq("email", formData.email)

      if (existingMember?.length) {
        setMessageType("error")
        setMessage("You are already a member")
        return
      }
      // Member doesn't exist, insert the data
      const { data, error } = await supabase
        .from(process.env.NEXT_PUBLIC_SUPABASE_TABLE as string)
        .insert([
          {
            name: formData.name,
            email: formData.email,
            career_path: formData.careerPath,
            experience: formData.experience,
            publish_at: formData.publishAt,
            why_join: formData.whyJoin,
          },
        ])
        .select()

      if (error) {
        setMessageType("error")
        setMessage("Error submitting form")
        console.error("Error submitting form:", error)
        return
      }
      setMessageType("success")
      setMessage("You have successfully joined Devwrite Africa Community")

      sendWelcomeEmail(formData.email, formData.name)
    } catch (error) {
      setMessageType("error")
      setMessage("Supabase error")
      console.error("Supabase error:", error)
    }
  }
  return (
    <FormWrapper onSubmit={(e) => handleSubmit(e)}>
      <StyledForm>
        <h2 style={{ marginBottom: "10px" }}>Join Devwrite Africa Community</h2>
        <FormGroup>
          <Label htmlFor="name">Name *:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email"> Career Path:</Label>
          <StyledSelect
            id="careerPath"
            name="careerPath"
            required
            onChange={handleChange}
            value={formData.careerPath}
          >
            <Option value=""></Option>
            <Option value="frontend">Frontend Developer</Option>
            <Option value="backend">Backend Developer</Option>
            <Option value="fullstack">Fullstack Developer</Option>
            <Option value="frontend">UI/UX Designer</Option>
            <Option value="devops">DevOps Engineer</Option>
            <Option value="data science">Data Scientist</Option>
            <Option value="ml/ai engineer">ML/AI Engineer</Option>
            <Option value="web3 developer">Web3 Developer</Option>
            <Option value="blockchain developer">Blockchain Developer</Option>
          </StyledSelect>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Years of Experience:</Label>
          <Input
            type="number"
            id="experience"
            name="experience"
            required
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Where do you publish your articles?:</Label>
          <Input
            type="text"
            id="publishAt"
            name="publishAt"
            required
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Why join Devwrite Africa Community?:</Label>
          <StyledTextArea
            id="whyJoin"
            name="whyJoin"
            rows={4}
            onChange={handleChange}
          ></StyledTextArea>
        </FormGroup>
        <p>
          By joining the community, you are agreeing to our{" "}
          <Link href="/conduct">code of conduct</Link>.
        </p>
        <StyledReCAPTCHA
          sitekey="6LfJokgpAAAAAMSPwOOghSb71mFqY2QN0PlYvJpk" // Replace with your reCAPTCHA site key
          onChange={onChange}
        />
        {message && (
          <DynamicAlert message={message} type={messageType}></DynamicAlert>
        )}

        <Button type="submit" disabled={!notARobbot}>
          Submit
        </Button>
      </StyledForm>
    </FormWrapper>
  )
}
const AlertWrapper = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;

  ${(props: { type: string }) =>
    props.type === "success" &&
    `
    background-color: #4CAF50;
    color: #fff;
  `}

  ${(props: { type: string }) =>
    props.type === "error" &&
    `
    background-color: #f44336;
    color: #fff;
  `}
`

const AlertIcon = styled.span`
  margin-right: 8px;

  ${(props: { type: string }) =>
    props.type === "success" &&
    `
    color: #fff;
  `}

  ${(props: { type: string }) =>
    props.type === "error" &&
    `
    color: #fff;
  `}
`

const DynamicAlert = ({ type, message }: { type: string; message: string }) => {
  return (
    <AlertWrapper type={type}>
      <AlertIcon type={type}>{type === "success" ? "✔" : "✖"}</AlertIcon>
      {message}
    </AlertWrapper>
  )
}

// Styled components
const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: "__pretendard_6bb8e5", "__pretendard_Fallback_6bb8e5";
  font-weight: 200;
  a {
    color: rgb(59, 73, 223);
  }
  p {
    text-align: center;
  }
  @media (max-width: 768px) {
    margin: 10px;
    .auth-button {
      width: 100%;
    }
    p {
      text-align: center;
    }
  }
`

const StyledForm = styled.form`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-weight: 300;
`

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #0056b3

  &:hover {
    background-color: #0056b3;
  }
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none; /* Remove default arrow in Chrome/Safari */
  background-color: #fff;
  cursor: pointer;
  font-weight: 300;
`

const Option = styled.option`
  font-size: 16px;
  font-weight: 300;
`
const StyledTextArea = styled.textarea`
  width: 100%;
  height: 150px; /* Adjust the height as needed */
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; /* Disable textarea resizing */
  font-weight: 300;
`
const StyledReCAPTCHA = styled(ReCAPTCHA)`
  margin-bottom: 20px;
`

export default StyledFormComponent
