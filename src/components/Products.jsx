import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Product } from './Product'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px; /* Adjust height as needed */
`

export const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          cat
            ? `https://server-vercel-psk6-tzzq-99lx87x6b-tushar453030s-projects.vercel.app/api/products?category=${cat}`
            : 'https://server-vercel-psk6-tzzq-99lx87x6b-tushar453030s-projects.vercel.app/api/products'
        )

        setProducts(res.data)
        console.log(res)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [cat])

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      )
  }, [products, cat, filters])

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    } else if (sort === 'asc') {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Container>
      {loading ? (
        <LoaderContainer>
          <ClipLoader size={50} color='#3498db' /> {/* Loader icon */}
        </LoaderContainer>
      ) : cat ? (
        filteredProducts.map((item) => <Product item={item} key={item.id} />)
      ) : (
        products
          .slice(0, 8)
          .map((item) => <Product item={item} key={item.id} />)
      )}
    </Container>
  )
}
