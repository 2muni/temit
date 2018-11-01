import React from 'react';
import EditorContainer from '../containers/editor/EditorContainer'

const Write = ({ match }) => {
  const { id } = match.params;

  return(
    <EditorContainer article={id}/>
  );
}

export default Write;