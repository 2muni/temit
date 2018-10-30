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
        article_id: null,
        comment: '',
        reply_to: null,
        user_id: null,
      },
      comments: {
        list: [],
      },
      edit_to: null
    }

    this.handleArticleRemove = this.handleArticleRemove.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
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
          draft.replies['article_id'] = this.props.articleData.id;
          draft.replies['user_id'] = this.props.status.id;
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
    data.append('article_id', this.state.replies.article_id);
    data.append('comment', this.state.replies.comment);
    data.append('reply_to', this.state.replies.reply_to);
    data.append('user_id', this.props.status.id);
    console.log(this.state.replies);
    this.props.CommentActions.postRequest(data)
      .then(() => this.props.CommentActions.listRequest(this.props.match.params.id))
      .then(() => this.setState(
        produce(this.state, draft => {
          draft.replies = {
            article_id: this.props.articleData.id,
            comment: '',
            reply_to: null,
            user_id: this.props.status.id
          }
          draft.comments['list'] = this.props.commentData;
        })
      ))
  } 

  handleEdit(e) {
    if(this.props.status.id == e.target.dataset.user && e.target.dataset.label === 'comment-edit') {
      
      this.setState({ edit_to: e.target.dataset.id })
    }else {
      this.setState({ edit_to: null })
    }
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
        draft.replies['comment'] = e.target.value;
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
            handleCommentRemove={this.handleCommentRemove}
            handleEdit={this.handleEdit}
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