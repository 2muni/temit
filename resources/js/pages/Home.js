import React from 'react';
import HomeContainer from '../containers/home/HomeContainer'
import AsideContainer from '../containers/base/AsideContainer'

const Home = () => (
    <div className="content-wrapper">
      <AsideContainer/>
      <HomeContainer/>
    </div>
  )

export default Home;