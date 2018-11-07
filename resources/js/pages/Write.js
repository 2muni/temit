import React from 'react';
import EditorContainer from '../containers/editor/EditorContainer'

const Write = ({ match, history }) => {
  const { id } = match.params;

  return(
    <EditorContainer 
      article={id}
      history={history}
      />
  );
}

export default Write;