import React, { Component } from 'react';
import { CommentHead, CommentBody, CommentView, CommentInput} from './';
import produce from 'immer';
import axios from 'axios';

class PostComment extends Component{

  constructor(props) {
    super(props)

    this.state = {
      comment: '',
      replies: [],
      view_reply: false,
    }

    this.handleView=this.handleView.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleCommentSubmit=this.handleCommentSubmit.bind(this)
    this.handleCommentRemove=this.handleCommentRemove.bind(this)
  }

  componentDidMount() {
    const data = new FormData()
    data.append('reply_to', this.props.comment.id)
    axios.post(`/api/articles/comments/${this.props.comment.article_id}`, data)
    .then((res) => this.setState({ replies: res.data }))
  }

  handleView(e) {
    if(e.target.dataset.label === 'replies') {
      this.setState({ view_reply: true });
    }else {
      this.setState({ view_reply: false });
    }
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }

  handleCommentSubmit() {
    let data = new FormData();
    data.append('comment', this.state.comment);
    data.append('user_id', this.props.user.id);
    data.append('reply_to', this.props.comment.id);
    data.append('article_id', this.props.comment.article_id);
    axios.post('/api/articles/comments', data)
    .then(() => axios.post(`/api/articles/comments/${this.props.comment.article_id}`, data))
    .then((res) => this.setState(
      produce(this.state, draft => {
        draft.comment = '';
        draft.replies = res.data;
      })
    ))
  }

  handleCommentRemove(e) {
    const data = new FormData()
    data.append('reply_to', this.props.comment.id)
    confirm("댓글을 삭제하시겠습니까?") && 
    axios.delete(`/api/articles/comments/${e.target.dataset.id}`)
    .then(() => axios.post(`/api/articles/comments/${this.props.comment.article_id}`, data))
    .then((res) => this.setState({ replies: res.data }))
  }

  render() {
    return(
      <div className="comment">
        <CommentHead
          user={this.props.user}
          comment={this.props.comment}
          handleCommentRemove={this.props.handleCommentRemove}
        />
        <CommentBody
          comment={this.props.comment}
        />
        <CommentView
          replies={this.state.replies}
          view_reply={this.state.view_reply}
          handleView={this.handleView}
        />
        {this.state.view_reply?
        <div className="replies">{this.state.replies.map((reply, i) => (
          <div key={i} className="comment">
            <CommentHead
              user={this.props.user}
              comment={reply}
              handleCommentRemove={this.handleCommentRemove}
            />
            <CommentBody
              comment={reply}
            />
          </div>))}
          <CommentInput
            value={this.state.comment}
            handleChange={this.handleChange}
            handleCommentSubmit={this.handleCommentSubmit}
          />
        </div> : undefined}
      </div>
    )
  }
}

export default PostComment;