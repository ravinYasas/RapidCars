import './Home.css'
import Header from '../../components/Header/Header.jsx'

import React from 'react'
import LatestCollection from '../../components/LatestCollection/LatestCollection.jsx'
import BestSeller from '../../components/BestSeller/BestSeller.jsx'
import ProvideService from '../../components/ProvideService/ProvideService.jsx'


const Home = () => {
  return (
    <div>
      <Header/>
      <LatestCollection/>
      <BestSeller/>
      <ProvideService/>
      
    </div>
  )
}

export default Home