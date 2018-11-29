import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../store/modules/article'

import { Preloader } from '../../components/etc'
import { PostHead } from '../../components/post/PostHead'
import { PostBody } from '../../components/post/PostBody'
import PostCommentContainer from './PostCommentContainer'

import tui from 'tui-editor'
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/vs2015.css'); // code block highlight

class PostContainer extends Component {

  constructor(props) {
    super(props);

    this.handleArticleRemove = this.handleArticleRemove.bind(this);
  }

  tuiEditor(content) {
    return this.editor = tui.factory({
      el: document.querySelector('.article-content'),
      viewer: true,
      initialValue: content,
    })
  }

  componentDidMount() {
    this.props.ArticleActions.getRequest(this.props.article)
      .then(() => this.tuiEditor(this.props.articleData.body))
  }

  handleArticleRemove() {
    if(this.props.currentUser.id === this.props.articleData.user.id) {
      confirm("게시글을 삭제하시겠습니까?") && 
      this.props.ArticleActions.removeRequest(this.props.article)
      .then(() => this.props.removeState === 'SUCCESS' && (window.location.href = `${window.location.origin}/board`))
    }
  }

  render() {
    return(
      this.props.currentUser && this.props.articleData ?
        <Fragment>
          <PostHead
            user={this.props.currentUser}
            article={this.props.articleData}
            handleArticleRemove={this.handleArticleRemove}
          />
          <PostBody
            article={this.props.articleData}
          />
          <PostCommentContainer
            user={this.props.currentUser}
            article={this.props.article}
          />
        </Fragment>
      : <Preloader/>
    );
  }
}

const mapStateToProps = (state) => ({
  articleData: state.article.get.data,
  removeState: state.article.remove.status,
  currentUser: state.authentication.status.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);