import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Products } from '../components/Products'
import Slider from '../components/Slider'
import CompareComponent from '../components/CompareComponent'

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <CompareComponent />
      <Categories />
      <Products />

      <Footer />
    </div>
  )
}

export default Home
