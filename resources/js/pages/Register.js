import React from 'react';
import RegisterContainer from '../containers/auth/RegisterContainer'

const Login = ({ match }) => {
  const { id } = match.params;

  return(
    <div className="article-wrapper">
      <RegisterContainer />
    </div>
  );
}

export default Login;