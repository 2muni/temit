import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../store/modules/article'
import * as commentActions from '../store/modules/comment'
import { Post, Preloader } from '../components'
import { produce } from 'immer'

class Article extends Component {

  constructor(props) {
    super(props);

    this.state = {
      replies: {
        article_id: null,
        comment: null,
        reply_to: null,
      },
      comments: {
        list: [],
      }
    }

    this.handleRemove = this.handleRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.ArticleActions.getRequest(this.props.match.params.id)
      .then(() => this.setState(
        produce(this.state, draft => {
          draft.replies['article_id'] = this.props.articleData.id
        })
      ));
  }

  handleRemove() {
    if(this.props.status.id === this.props.articleData.user.id) {
      confirm("게시글을 삭제하시겠습니까?") && 
      this.props.ArticleActions.removeRequest(this.props.match.params.id);
    }
  }

  handleSubmit() {
    let data = new FormData();
    data.append('article_id', this.state.replies.article_id);
    data.append('comment', this.state.replies.comment);
    data.append('reply_to', this.state.replies.reply_to);
    this.props.CommentActions.postRequest(data)
      .then(() => this.setState(
        produce(this.state, draft => {
          draft.replies = {
            article_id: null,
            comment: null,
            reply_to: null,
          }
        })
      ));
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
            handleRemove={this.handleRemove}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
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