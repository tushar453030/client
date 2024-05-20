import React from 'react'
import styled from 'styled-components'
import { ShoppingCartOutlined } from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../redux/apiCalls'

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: '10px 0px' })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Language = styled.span`
  font-size: 14px;
  color: black;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`

const LogoCompare = styled.h1`
  font-weight: bold;
  font-family: 'Arial, sans-serif'; // Insert your desired font family here
  ${mobile({ fontSize: '24px' })}
`

const Subtitle = styled.span`
  font-weight: normal;
  font-size: 0.5em; // Adjust the size relative to the Logo
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`

const MenuItem = styled.div`
  font-display: 14px;
  color: black;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity)
  const currentUser = useSelector((state) => state.user.currentUser)
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { isFetching, error } = useSelector((state) => state.user)

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Center>
              <Logo>Shop2nd</Logo>
            </Center>
          </Link>
        </Left>

        {/* <Link to='/' style={{ textDecoration: 'none' }}>
          <Center>
            <Logo>Shop2nd</Logo>
          </Center>
        </Link> */}

        <Link to='/compare' style={{ textDecoration: 'none' }}>
          <Center>
            <LogoCompare>
              Compare<Subtitle>Powered by Gemini</Subtitle>
            </LogoCompare>
          </Center>
        </Link>

        <Right>
          {currentUser ? (
            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
          ) : (
            <>
              <Link to='/register' style={{ textDecoration: 'none' }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}

          <Link to='/cart'>
            <MenuItem>
              <Badge badgeContent={quantity} color='primary'>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
