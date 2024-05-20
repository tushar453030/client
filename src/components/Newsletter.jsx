import { Send, CheckCircle } from '@material-ui/icons'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useState } from 'react'
import axios from 'axios'

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: 'center' })}
`

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: '80%' })}
`

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleInputChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://server-vercel-psk6-tzzq-99lx87x6b-tushar453030s-projects.vercel.app/api/email/sendEmail',
        {
          email: email,
        }
      )
      if (response.status === 200) {
        setSent(true)
      } else {
        alert('Failed to send email.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error sending email.')
    }
  }
  return (
    <Container>
      <Title>Get Updates</Title>
      <Desc>Get timely updates from us</Desc>
      <InputContainer>
        <Input
          placeholder='Your email'
          value={email}
          onChange={handleInputChange}
          disabled={sent}
        />
        <Button onClick={handleSubmit} disabled={sent}>
          {sent ? <CheckCircle /> : <Send />}
        </Button>
      </InputContainer>
      {sent && <Desc>Email sent!</Desc>}
    </Container>
  )
}

export default Newsletter
