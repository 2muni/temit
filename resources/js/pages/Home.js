import React from 'react';
import HomeContainer from '../containers/home/HomeContainer'
import AsideContainer from '../containers/base/AsideContainer'

const Home = () => (
    <div className="content-wrapper">
      <HomeContainer/>
      <AsideContainer/>
    </div>
  )

export default Home;