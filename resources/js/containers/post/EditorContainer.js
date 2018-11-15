import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../store/modules/article'
import { produce } from 'immer';
import { resize } from '../../lib/tool';
import axios from 'axios';

import { EditorNav } from '../../components/post/editor/EditorNav'

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
    this.requestImageURL = this.requestImageURL.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  requestImageURL(blob, path, callback) {
    return new Promise((res, rej) => {
      const src = blob;
      let data = new FormData();
      data.append('user_id', this.props.user.id);
      data.append('path', path);
  
      const reader = new FileReader();
      reader.onload = e => {
        const image = new Image();
        image.src = reader.result;
        image.onload = imageEvent => {
          data.append('image', resize(768, image), this.props.user.name);
          if(callback)
            res(axios.post('/api/images', data)
            .then((res) => callback(res.data)));
          else{
            res(axios.post('/api/images', data)
            .then((res) => (res.data)));
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
          this.requestImageURL(blob, 'articles', callback)
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
        if(this.props.user.id == this.props.articleData.user.id) {
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

  handleChange(e) {
    console.log(this.state.tags.length)
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
    if(e.target.className === 'material-icons') {
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
    let data = new FormData();
    data.append('tags', this.state.tags);
    data.append('user_id', this.props.user.id);
    data.append('title', this.state.post.title);
    data.append('body', this.state.post.body);
    if(this.state.post.thumbnail) {
      this.requestImageURL(this.state.post.thumbnail, 'articles')
        .then((url) => data.append('thumbnail', url))
        .then(() => {
          if(this.props.article)
            this.props.ArticleActions.editRequest(this.props.article, data)
              .then(() => this.props.postState === 'SUCCESS' && (window.location.href = '/board'))
          else
            this.props.ArticleActions.postRequest(data)
              .then(() => this.props.postState === 'SUCCESS' && (window.location.href = '/board'))
        })
    }else {
      if(this.props.article) {
        this.props.ArticleActions.editRequest(this.props.article, data)
          .then(() => this.props.postState === 'SUCCESS' && (window.location.href = '/board'))
      }else {
        this.props.ArticleActions.postRequest(data)
          .then(() => this.props.postState === 'SUCCESS' && (window.location.href = '/board'))
      }
    }
  }
  
  render() {
    return ( 
      <div id="editor">
        <EditorNav
          post={this.state.post}
          tags={this.state.tags}
          handleTags={this.handleTags}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <div id="editSection"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articleData: state.article.get.data,
  postState: state.article.post.status
});

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);