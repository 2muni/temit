import React from 'react';
import LoginContainer from '../containers/auth/LoginContainer'

const Login = ({ match }) => {
  const { id } = match.params;

  return(
    <div className="article-wrapper">
      <LoginContainer />
    </div>
  );
}

export default Login;