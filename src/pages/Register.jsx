import styled from 'styled-components'
import { mobile } from '../responsive'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid #ccc; /* Add a border to the input */
  border-radius: 4px; /* Add rounded corners */
  outline: none; /* Remove the default focus outline */
  font-size: 16px; /* Set a font size */
`

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // Replace "https://your-backend-server-url/api/register" with your actual backend endpoint for user registration
      await axios.post(
        'https://vercel.com/tushar453030/server-vercel-psk6/api/auth/register',
        formData
      )
      navigate('/')
      // Handle successful registration, e.g., redirect to a success page or show a success message
      console.log('User registered successfully!')
    } catch (error) {
      // Handle registration error, e.g., display an error message
      console.error('Error during user registration:', error)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            name='username' // Add the name attribute for capturing the input value in the state
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type='email'
            name='email' // Add the name attribute for capturing the input value in the state
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type='password'
            name='password' // Add the name attribute for capturing the input value in the state
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
          />
          {/* ... your other inputs ... */}
          <Agreement>{/* ... your existing Agreement text ... */}</Agreement>
          <Button type='submit'>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
