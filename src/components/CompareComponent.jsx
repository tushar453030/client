import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #f8f8f8; /* Soft gray background */
`

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 40px;
  font-family: 'Roboto', Arial, sans-serif; /* Better font family */
  line-height: 1.5; /* Improved spacing between lines */
`

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const Statement = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: #333;
  margin-bottom: 20px;
  text-align: left; /* Align text to the left */
  white-space: pre-line; /* Ensures text stays on separate lines */
  font-family: 'Roboto', Arial, sans-serif;
  text-transform: uppercase; /* For an artistic touch */
  letter-spacing: 1px; /* Adds subtle spacing between letters */
  line-height: 1.2; /* Adjusts line height for a more compact look */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow for depth */
`

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
`

const CompareComponent = () => {
  return (
    <Container>
      <LeftSection>
        <Statement>
          Compare your products using AI.{'\n'}
          <span>Click on the button to get started.</span>
        </Statement>
      </LeftSection>
      <RightSection>
        <Link to='/compare' style={{ textDecoration: 'none' }}>
          <Button>Compare Now</Button>
        </Link>
      </RightSection>
    </Container>
  )
}

export default CompareComponent
