import React from 'react';
import HomeContainer from '../containers/home/HomeContainer'
import AsideContainer from '../containers/base/AsideContainer'

const Home = () => (
    <div className="snapshot-wrapper">
      <AsideContainer
        items={[
          {
            link: '',
            icon: 'create',
            label: '새 스냅샷'
          }
        ]}
      />
      <HomeContainer/>
    </div>
  )

export default Home;