import React from 'react';
import LoginContainer from '../containers/auth/LoginContainer'

const Login = ({ match, history }) => {
  const { id } = match.params;

  return(
    <LoginContainer
      history={history}
    />
  );
}

export default Login;