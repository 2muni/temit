import React, { Component } from 'react';
import { Navbar, NavItem, Button, Input, Autocomplete, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { articlePostRequest } from '../actions/article'

import tui from 'tui-editor'
import "tui-editor/dist/tui-editor-Editor.js";
require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css'); // editor ui
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/vs2015.css'); // code block highlight


class Editor extends Component {

  state = {
    'title': '',
    'body': '',
    'thumbnail': '',
    'tags': '',
  }

  componentDidMount() {
    document.body.clientWidth > 992 ? 
      this.editor = new tui({
        el: document.getElementById('editSection'),
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: 'calc(100% - 64px)',
        usageStatistics: false,
        events: {
          change: () => { this.setState({ body: this.editor.getValue() });
          }
        }
      })
    :
      this.editor = new tui({
        el: document.getElementById('editSection'),
        initialEditType: 'markdown',
        previewStyle: 'tab',
        height: 'calc(100% - 64px)',
        usageStatistics: false,
        events: {
          change: () => { this.setState({ body: this.editor.getValue() });
          }
        }
      })
  } 

  handlePost = () => {
    console.log(this.editor.getValue());
  }

  handleChange = (e) => {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  
  render() {
    return ( 
      <>
        <div className="submit-wrapper">
          <div className="submit-card">
            <div className="submit-header">새 글 작성하기</div>
            <div className="submit-form">
              <div class="submit-title">
                <Input s={6} label="글 제목" />
              </div>
              <div class="submit-tags">
                <Input s={6} label="태그 설정" />
              </div>
              <div class="submit-thumbnail">
                <Row>
                  <Input type="file" label="업로드" s={12} />
                </Row>
              </div>
              <div class="submit-btns">
                <button className="btn">임시저장</button>
                <button className="btn">작성하기</button>
              </div>
            </div>
          </div>
        </div>
        <Navbar brand='temit' right>
          <NavItem><Button className="red" onClick={this.handlePost}>작성하기</Button></NavItem>
        </Navbar>
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
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);