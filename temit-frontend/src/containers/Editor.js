import React, { Component } from 'react';
import marked from 'marked';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import Prism from 'prismjs'

class Editor extends Component {

  state = {
    value: ''
  }

  handleChange = (value) => {
    this.setState({value});
    Prism.highlightAll();
  }
  
  rawMarkup() {
    return { __html: marked(this.state.value, {sanitize: true}) };
  }
  
  render() {
    return ( 
      <>
        <div className="editor-wrapper">
          <SimpleMDE
            onChange={this.handleChange}
            value={this.state.textValue}
            options={{
              autofocus: true,
              spellChecker: false,
              toolbar:[
                "bold", "italic", "heading", "|",
                "quote", "unordered-list", "ordered-list", "|",
                "link", "image", "table", "|", "guide"],
              placeholder: "본 에디터는 마크다운 문법을 허용합니다...",
            }}
          />
        </div>
        <div className="preview-wrapper">
          <div className="preview-title">미리보기</div>
          <div className="preview-content" dangerouslySetInnerHTML={this.rawMarkup()}></div>
        </div>
      </>
    );
  }
}

export default Editor;