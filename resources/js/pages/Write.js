import React from 'react';
import EditorContainer from '../containers/editor/EditorContainer'
import { getCookie } from '../lib/cookie'

const Write = ({ match, history }) => {
  const { id } = match.params;

  return(
    <EditorContainer 
      article={id}
      history={history}
      user={getCookie('user').currentUser}
      />
  );
}

export default Write;