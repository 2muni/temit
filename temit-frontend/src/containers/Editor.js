import React, { Component } from 'react';
import { Navbar, NavItem, Button, Input, Autocomplete, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { articlePostRequest } from '../actions/article'
import { produce } from 'immer';

import tui from 'tui-editor'
import "tui-editor/dist/tui-editor-Editor.js";
require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css'); // editor ui
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/vs2015.css'); // code block highlight


class Editor extends Component {

  state = {
    post: {
      title: '',
      body: '',
      thumbnail: '',
      tags: '',
    }
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

  handleSubmitCard = (e) => {
    const cn = /(post)/
    const isPost = cn.test(e.target.className);
    
    if(isPost)
      document.querySelector('.submit-wrapper').style.display = 'flex';
    else if(e.target.className === 'submit-wrapper')
      document.querySelector('.submit-wrapper').style.display = 'none'
  }

  handleChange = (e) => {
    this.setState(
      produce(this.state, draft => {
        draft.post[e.target.name] = e.target.value;
      })
    );
  }

  handlePost = () => {
    console.log('Post Request');
  }

  Submit = () => (
    <div className="submit-wrapper" style={{ display: 'none' }} onClick={this.handleSubmitCard}>
      <div className="submit-card">
        <div className="submit-header">새 글 작성하기</div>
        <div className="submit-form">
          <div className="submit-title">
            <Input s={6} label="글 제목" name="title" onChange={this.handleChange} value={this.state.title} />
          </div>
          <div className="submit-tags">
            <Input s={6} label="태그 설정" name="tags" onChange={this.handleChange} value={this.state.tags} />
          </div>
          <div className="submit-thumbnail">
            <Row>
              <Input s={12} type="file" label="업로드" name="thumbnail" onChange={this.handleChange} value={this.state.thumbnail} />
            </Row>
          </div>
        </div>
        <div className="submit-footer">
          <div className="btns-group">
            <Button className="save">임시저장</Button>
            <Button className="submit" onClick={this.handlePost}>작성하기</Button>
          </div>
          <div className="option">
            <span>추가설정</span>
          </div>
        </div>
      </div>
    </div>
  )
  
  render() {
    return ( 
      <>
        <this.Submit/>
        <Navbar brand='temit' right>
          <Button className="red post" onClick={this.handleSubmitCard}>작성하기</Button>
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