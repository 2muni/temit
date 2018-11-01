import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../store/modules/article'
import { produce } from 'immer';
import { resize } from '../../lib/tool';
import axios from 'axios';

import { EditorNav } from '../../components/editor/EditorNav'
import { EditorSubmit } from '../../components/editor/EditorSubmit'

import tui from 'tui-editor'
require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css'); // editor ui
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/vs2015.css'); // code block highlight

class EditorContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        body: '',
        thumbnail: '',
        tag: '',
      },
      tags:[],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitCard = this.handleSubmitCard.bind(this);
    this.requestImageURL = this.requestImageURL.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  requestImageURL(blob, callback) {
    return new Promise((res, rej) => {
      const src = blob;
      let data = new FormData();
      data.append('user_id', this.props.status.id);
      data.append('path', 'articles');
  
      const reader = new FileReader();
      reader.onload = e => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = imageEvent => {
          data.append('image', resize(image), this.props.status.username);
          if(callback)
            res(axios.post('/api/images', data).then((res) => 
            callback(res.data)));
          else{
            res(axios.post('/api/images', data).then((res) => {
              return res.data}));
          }
        }
      }
      reader.readAsDataURL(src);
    });
  }

  tuiEditor(preview) {
    return this.editor = new tui({
      el: document.getElementById('editSection'),
      initialEditType: 'markdown',
      previewStyle: preview,
      height: 'calc(100% - 64px)',
      usageStatistics: false,
      hooks: {
        'addImageBlobHook': (blob, callback) => {
          this.requestImageURL(blob, callback)
        }
      },
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
  }

  componentDidMount() {
    document.body.clientWidth > 992 ? 
      this.tuiEditor('vertical') : this.tuiEditor('tab')

    if(this.props.article) {
      this.props.ArticleActions.getRequest(this.props.article)
      .then(() => {
        if(this.props.status.id == this.props.articleData.user.id) {
          this.setState(
            produce(this.state, draft => {
              draft.post['title'] = this.props.articleData.title;
              draft.post['body'] = this.props.articleData.body;
            }));
          this.editor.setValue(this.state.post.body);
        }else {
          alert('잘못된 접근입니다.');
          this.props.history.push('/');
        }
      })
    }
  } 

  handleSubmitCard(e) {
    const cn = /(post)/
    const isPost = cn.test(e.target.className);
    
    if(isPost)
      document.querySelector('.submit-wrapper').style.display = 'flex';
    else if(e.target.className === 'submit-wrapper')
      document.querySelector('.submit-wrapper').style.display = 'none'
  }

  handleChange(e) {
    this.setState(
      produce(this.state, draft => {
        if(e.target.name === 'thumbnail') {
          draft.post['thumbnail'] = e.target.files[0];
        }
        else
          draft.post[e.target.name] = e.target.value;
      })
    );
  }

  handleTags(e) {
    if(e.target.className === 'tag') {
      this.setState(produce(this.state, draft => {
        draft.tags.splice(e.target.dataset.id, 1);
      }))
    }else {
      const tag = this.state.post.tag;
      if(tag){
        this.setState(produce(this.state, draft => {
          draft.tags.push(tag);
          draft.post['tag'] = '';
        }))
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append('tags', this.state.tags);
    data.append('user_id', this.props.status.id);
    data.append('title', this.state.post.title);
    data.append('body', this.state.post.body);
    if(this.state.post.thumbnail) {
    this.requestImageURL(this.state.post.thumbnail)
      .then((url) => data.append('thumbnail', url))
      .then(() => {
        if(this.props.article)
          this.props.ArticleActions.editRequest(this.props.article, data)
            .then(() => this.props.history.push('/'))
        else
          this.props.ArticleActions.postRequest(data)
            .then(() => this.props.history.push('/'))
      })
    }else {
      if(this.props.article) {
        console.log(this.state.post);
        this.props.ArticleActions.editRequest(this.props.article, data)
          .then(() => this.props.history.push('/'))
      }
      else{
        this.props.ArticleActions.postRequest(data)
          .then(() => this.props.history.push('/'))
      }
    }

  }
  
  render() {
    return ( 
      <div id="editor">
        <EditorNav
          handleSubmitCard={this.handleSubmitCard}
        />
        <div id="editSection"/>
        <EditorSubmit
          post={this.state.post}
          tags={this.state.tags}
          handleTags={this.handleTags}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleSubmitCard={this.handleSubmitCard}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.user.status,
  articleData: state.article.get.data
});

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);