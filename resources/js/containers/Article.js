import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../store/modules/article'
import * as commentActions from '../store/modules/comment'
import { Post, Preloader } from '../components'
import { produce } from 'immer'

import tui from 'tui-editor'
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/vs2015.css'); // code block highlight

class Article extends Component {

  constructor(props) {
    super(props);

    this.state = {
      replies: {
        comment: '',
        reply_to: null,
      },
      comments: {
        list: [],
      },
      edit_to: {
        id: null,
        comment: '',
      },
      isReply: false
    }

    this.handleArticleRemove = this.handleArticleRemove.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentEdit = this.handleCommentEdit.bind(this);
    this.handleCommentRemove = this.handleCommentRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  tuiEditor(content) {
    return this.editor = tui.factory({
      el: document.querySelector('.article-content'),
      viewer: true,
      initialValue: content,
    })
  }

  componentDidMount() {
    this.props.ArticleActions.getRequest(this.props.match.params.id)
      .then(() => this.tuiEditor(this.props.articleData.body))
      .then(() => this.props.CommentActions.listRequest(this.props.match.params.id))
      .then(() => this.setState(
        produce(this.state, draft => {
          draft.comments['list'] = this.props.commentData;
        })
      ))
  }

  handleArticleRemove() {
    if(this.props.status.id === this.props.articleData.user.id) {
      confirm("게시글을 삭제하시겠습니까?") && 
      this.props.ArticleActions.removeRequest(this.props.match.params.id);
    }
  }

  handleCommentSubmit() {
    let data = new FormData();
    data.append('article_id', this.props.articleData.id);
    data.append('comment', this.state.replies.comment);
    if(this.state.replies.reply_to)
      data.append('reply_to', this.state.replies.reply_to);
    data.append('user_id', this.props.status.id);
    this.props.CommentActions.postRequest(data)
      .then(() => this.props.CommentActions.listRequest(this.props.match.params.id))
      .then(() => this.setState(
        produce(this.state, draft => {
          draft.replies = {
            comment: '',
            reply_to: null,
          }
          draft.comments['list'] = this.props.commentData;
        })
      ))
  } 

  handleEdit(e) {
    if(this.props.status.id == e.target.dataset.user && e.target.dataset.label === 'comment-edit') {
      this.setState(
        produce(this.state, draft => {
          draft.edit_to['id']= e.target.dataset.id
        }))
    }else {
      this.setState(
        produce(this.state, draft => {
          draft.edit_to['id']= null
        }))
    }
  }

  handleCommentEdit() {
    let data = new FormData();
    data.append('article_id', this.props.articleData.id);
    data.append('comment', this.state.edit_to.comment);
    data.append('reply_to', this.state.replies.reply_to);
    data.append('user_id', this.props.status.id);
    this.props.CommentActions.editRequest(this.state.edit_to.id, data)
      .then(() => this.props.CommentActions.listRequest(this.props.match.params.id))
      .then(() => this.setState(
        produce(this.state, draft => {
          draft.edit_to = {
            id: null,
            comment: '',
          }
          draft.comments['list'] = this.props.commentData;
        })
      ))
  } 

  handleCommentRemove(e) {
    if(this.props.status.id == e.target.dataset.user) {
      confirm("댓글을 삭제하시겠습니까?") && 
      this.props.CommentActions.removeRequest(e.target.dataset.id)
      .then(() => this.props.CommentActions.listRequest(this.props.match.params.id))
      .then(() => this.setState(
        produce(this.state, draft => {
          draft.comments['list'] = this.props.commentData;
        })
      ))
    }
  }

  handleChange(e) {
    this.setState(
      produce(this.state, draft => {
        draft[e.target.name].comment = e.target.value;
      })
    );
  }
  
  render() {
    return(
      <div className="article-wrapper">
        {this.props.articleData ?
          <Post
            user={this.props.status.id}
            article={this.props.articleData}
            handleArticleRemove={this.handleArticleRemove}
            handleCommentSubmit={this.handleCommentSubmit}
            handleCommentEdit={this.handleCommentEdit}
            handleCommentRemove={this.handleCommentRemove}
            handleEdit={this.handleEdit}
            handleReply={this.handleReply}
            handleChange={this.handleChange}
            replies={this.state.replies.comment}
            comments={this.state.comments.list}
            edit_to={this.state.edit_to}
            /> :
          <Preloader/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.user.status,
  articleData: state.article.get.data,
  commentData: state.comment.list.data,
})

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch),
  CommentActions: bindActionCreators(commentActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);