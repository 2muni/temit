import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from '../../store/modules/comment'
import { produce } from 'immer'
import { PostComments } from '../../components/Post/Comment'

class Article extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      list: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentRemove = this.handleCommentRemove.bind(this);
  }

  componentDidMount() {
    this.props.CommentActions.listRequest(this.props.article)
    .then(() => this.setState(
      produce(this.state, draft => {
        draft.list = this.props.commentData;
      })
    ))
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }

  handleCommentSubmit() {
    let data = new FormData();
    data.append('article_id', this.props.article);
    data.append('comment', this.state.comment);
    data.append('user_id', this.props.status.id);
    this.props.CommentActions.postRequest(data)
    .then(() => this.props.CommentActions.listRequest(this.props.article))
    .then(() => this.setState(
      produce(this.state, draft => {
        draft.comment = '';
        draft.list = this.props.commentData;
      })
    ))
  }

  handleCommentRemove(e) {
    if(this.props.status.id == e.target.dataset.user) {
      confirm("댓글을 삭제하시겠습니까?") && 
      this.props.CommentActions.removeRequest(e.target.dataset.id)
      .then(() => this.props.CommentActions.listRequest(this.props.article))
      .then(() => this.setState({ list: this.props.commentData }))
    }
  }

  render() {
    return(
      <PostComments
          user={this.props.status}
          comment={this.state.comment}
          list={this.state.list}
          handleChange={this.handleChange}
          handleCommentSubmit={this.handleCommentSubmit}
          handleCommentRemove={this.handleCommentRemove}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.user.status,
  commentData: state.comment.list.data,
})

const mapDispatchToProps = (dispatch) => ({
  CommentActions: bindActionCreators(commentActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);