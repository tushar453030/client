import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

const Container = styled.div``

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({ padding: '10px' })}
`

const ComparisonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`

const ProductBox = styled.div`
  flex: 1;
  border: 1px solid black;
  padding: 20px;
  margin: 10px;
  text-align: center;
`

const ProductsList = styled.div`
  width: 100%;
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-top: 20px;
  &:hover {
    background-color: #f8f4f4;
  }
`

const ResultContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  border: 1px solid black;
  padding: 20px;
  background-color: #008080;
  color: white;
  text-align: center;
`

const ProductCard = styled.div`
  border: 1px solid teal;
  padding: 20px;
  margin: 10px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: #f8f4f4;
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
`

const Header = styled.h2`
  text-align: center;
  margin: 20px 0;
`

const Instruction = styled.p`
  text-align: center;
  margin: 10px 0;
  font-style: italic;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px; /* Adjust height as needed */
`

const Compare = () => {
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([null, null])
  const [comparisonResult, setComparisonResult] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          'https://server-vercel-psk6-tzzq-qo1bv23bc-tushar453030s-projects.vercel.app/api/products'
        )
        // const res = await axios.get('http://localhost:5000/api/products')
        setProducts(res.data)
        console.log(res)
      } catch (err) {
        console.error(err)
      }
    }
    getProducts()
  }, [])

  const handleProductSelect = (product) => {
    if (!selectedProducts[0]) {
      setSelectedProducts([product, null])
    } else if (!selectedProducts[1]) {
      setSelectedProducts([selectedProducts[0], product])
    } else {
      setSelectedProducts([product, null])
    }
  }

  const handleCompare = async () => {
    setLoading(true)
    const body = {
      products: selectedProducts.map((p) => ({ desc: p.desc })),
    }

    try {
      // const response = await axios.post(
      //   'http://localhost:5000/api/gimini/sendGemini',
      //   body
      // )
      const response = await axios.post(
        'https://server-vercel-psk6-tzzq-qo1bv23bc-tushar453030s-projects.vercel.app/api/gimini/sendGemini',
        body
      )
      setComparisonResult(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error comparing products:', error)
    }
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Top>
        <Link to='/products' style={{ textDecoration: 'none' }}>
          <TopButton>CONTINUE SHOPPING</TopButton>
        </Link>
      </Top>
      <Wrapper>
        <Header>
          Compare the products with Generative AI powered by Google Gemini
        </Header>
        <Instruction>
          Please select two equally relevant products to get a good comparison
        </Instruction>
        <ComparisonContainer>
          <ProductBox>
            {selectedProducts[0] ? (
              <>
                <ProductImage
                  src={selectedProducts[0].img}
                  alt={selectedProducts[0].title}
                />
                <h3>{selectedProducts[0].title}</h3>
                <p>{selectedProducts[0].desc}</p>
              </>
            ) : (
              <p>Select a product for the first slot</p>
            )}
          </ProductBox>
          <ProductBox>
            {selectedProducts[1] ? (
              <>
                <ProductImage
                  src={selectedProducts[1].img}
                  alt={selectedProducts[1].title}
                />
                <h3>{selectedProducts[1].title}</h3>
                <p>{selectedProducts[1].desc}</p>
              </>
            ) : (
              <p>Select a product for the second slot</p>
            )}
          </ProductBox>
        </ComparisonContainer>

        <Button
          onClick={handleCompare}
          disabled={!selectedProducts[0] || !selectedProducts[1]}
        >
          {loading ? 'Loading...' : 'Compare Them'}
        </Button>
        {comparisonResult && (
          <ResultContainer>
            <h1>Result</h1>
            <h2>{JSON.stringify(comparisonResult.comparison, null, 2)}</h2>
          </ResultContainer>
        )}

        <ProductsList>
          {products.length === 0 ? (
            <LoaderContainer>
              <ClipLoader size={50} color='#3498db' /> {/* Loader icon */}
            </LoaderContainer>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                onClick={() => handleProductSelect(product)}
              >
                <ProductImage src={product.img} alt={product.name} />
                <h3>{product.title}</h3>
                <p>{product.desc}</p>
              </ProductCard>
            ))
          )}
        </ProductsList>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Compare
