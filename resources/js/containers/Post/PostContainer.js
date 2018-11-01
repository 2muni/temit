import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../store/modules/article'
import { Preloader } from '../../components/etc'
import { PostHead } from '../../components/post/PostHead'
import { PostBody } from '../../components/post/PostBody'

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
    if(this.props.status.id === this.props.articleData.user.id) {
      confirm("게시글을 삭제하시겠습니까?") && 
      this.props.ArticleActions.removeRequest(this.props.article);
    }
  }

  render() {
    return(
      <Fragment>
        {this.props.articleData ?
          <Fragment>
            <PostHead
              user={this.props.status}
              article={this.props.articleData}
              handleArticleRemove={this.handleArticleRemove}
            />
            <PostBody
              article={this.props.articleData}
            />
          </Fragment>
        : <Preloader/>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.user.status,
  articleData: state.article.get.data,
})

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);