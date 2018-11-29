import React from 'react';
import LoginContainer from '../containers/auth/LoginContainer'

const Login = ({ match, history }) => {
  const { responseURL } = match.params;

  return(
    <LoginContainer
      history={history}
      responseURL={responseURL}
    />
  );
}

export default Login;