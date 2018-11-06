import React from 'react';
import LoginContainer from '../containers/auth/LoginContainer'

const Login = ({ match, history }) => {
  const { id } = match.params;

  return(
    <div className="article-wrapper">
      <LoginContainer
      history={history}
      />
    </div>
  );
}

export default Login;