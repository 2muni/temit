import React, { Component } from 'react';
import { Navbar, Button, Input, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../store/modules/article'
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

  tuiEditor = (preview) => (
    this.editor = new tui({
      el: document.getElementById('editSection'),
      initialEditType: 'markdown',
      previewStyle: preview,
      height: 'calc(100% - 64px)',
      usageStatistics: false,
      events: {
        change: () => { 
          this.setState(
            produce(this.state, draft => {
              draft.post['body'] = this.editor.getValue()
            })
          );
        }
      }
    })
  )

  componentDidMount() {
    document.body.clientWidth > 992 ? 
      this.tuiEditor('vertical') : this.tuiEditor('tab')
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


  handleSubmit = (e) => {
    e.preventDefault();
  }

  Submit = () => (
    <div className="submit-wrapper" style={{ display: 'none' }} onClick={this.handleSubmitCard}>
      <form className="submit-card" onSubmit={this.handleSubmit}>
        <div className="submit-header">새 글 작성하기</div>
        <div className="submit-form">
          <section>
            <div className="section-title">글 제목</div>
            <div className="text submit-title">
              <input name="title" placeholder="제목을 입력하세요" required
                onChange={this.handleChange}
                value={this.state.title}  
              />
            </div>
          </section>
          <section>
            <div className="section-title">태그 설정</div>
            <div className="text submit-tags">
              <input name="tags" placeholder="태그를 입력하세요"
                onChange={this.handleChange}
                value={this.state.tags} 
              />
              <div className="btn util">등록</div>
            </div>
          </section>
          <section>
          <div className="section-title">썸네일 지정</div>
            <div className="submit-thumbnail">
              <Row>
                <Input s={12} type="file" label="업로드" name="thumbnail" 
                  onChange={this.handleChange} 
                  value={this.state.thumbnail}
                  accept=".jpg, .jpeg, .png"
                  />
              </Row>
            </div>
          </section>
        </div>
        <div className="submit-footer">
          <div className="btns-group">
            <Button className="btn save">임시저장</Button>
            <Button type="submit" className="submit">작성하기</Button>
          </div>
        </div>
      </form>
    </div>
  )
  
  render() {
    return ( 
      <>
        <this.Submit/>
        <Navbar brand='temit' right>
          <Button className="btn post" onClick={this.handleSubmitCard}>작성하기</Button>
        </Navbar>
        <div id="editSection"/>
      </>
    );
  }
}

const mapStateToProps = ({ article }) => ({
  postStatus: article.post
});

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);