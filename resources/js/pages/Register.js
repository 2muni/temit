import React from 'react';
import RegisterContainer from '../containers/auth/RegisterContainer'

const Login = ({ match, history }) => {
  const { id } = match.params;

  return(
    <div className="article-wrapper">
      <RegisterContainer
        history={history}
      />
    </div>
  );
}

export default Login;