import React from 'react';
import RegisterContainer from '../containers/auth/RegisterContainer'

const Login = ({ match, history }) => {
  const { id } = match.params;

  return(
    <RegisterContainer
      history={history}
    />
  );
}

export default Login;