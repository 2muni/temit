import React from 'react';
import UserContainer from '../containers/user/UserContainer'
import { getCookie } from '../lib/cookie'

const Uesr = ({ match, history }) => {
  const { id } = match.params;

  return(
    <div className="user-wrapper">
      <UserContainer
        id={id}
        history={history}
        currentUser={getCookie('user').currentUser}
      />
    </div>
  );
}

export default Uesr;