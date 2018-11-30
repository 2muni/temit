import React from 'react';
import UserContainer from '../containers/user/UserContainer'

const Uesr = ({ match, history }) => {
  const { id } = match.params;

  return(
    <div className="user-wrapper">
      <UserContainer
        id={Number(id)}
        history={history}
      />
    </div>
  );
}

export default Uesr;