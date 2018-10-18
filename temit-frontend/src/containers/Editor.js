import React, { Component } from 'react';
import { connect } from 'react-redux';
import { articlePostRequest, articlePostValue } from '../actions/article'

import tui from 'tui-editor'
import "tui-editor/dist/tui-editor-Editor.js";
require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css'); // editor ui
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/vs2015.css'); // code block highlight


class Editor extends Component {

  state = {
    value: ''
  }

  componentDidMount() {
    document.body.clientWidth > 992 ? 
      this.editor = new tui({
        el: document.getElementById('editSection'),
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '100%',
        usageStatistics: false,
        events: {
          change: () => { this.props.articlePostValue(this.editor.getValue()) }
        }
      })
    :
      this.editor = new tui({
        el: document.getElementById('editSection'),
        initialEditType: 'markdown',
        previewStyle: 'tab',
        height: '100%',
        usageStatistics: false,
        events: {
          change: () => { this.props.articlePostValue(this.editor.getValue()) }
        }
      });
  } 

  handlePost = () => {
    console.log(this.editor.getValue());
  }
  
  render() {
    return ( 
      <>
        <div id="editSection"/>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postStatus: state.article.post
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    articlePostRequest: (data) => (
      dispatch(articlePostRequest(data))
    ),
    articlePostValue: (value) => (
      dispatch(articlePostValue(value))
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);