import React from 'react';
import UserContainer from '../containers/user/UserContainer'
import AsideContainer from '../containers/base/AsideContainer'

const Uesr = ({ match, history }) => {
  const { id } = match.params;

  return(
    <div className="content-wrapper">
      <UserContainer
        id={Number(id)}
        history={history}
      />
      <AsideContainer/>
    </div>
  );
}

export default Uesr;