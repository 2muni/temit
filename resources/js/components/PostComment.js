import React, { Component } from 'react';
import { produce } from 'immer'
import axios from 'axios'
import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { Button } from 'react-materialize';
const formatter = buildFormatter(koreanStrings)

class PostComment extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isReply: false,
      replies: [],
      comment: '',
      edit_to: {
        id: null,
        comment: '',
      },
    }

    this.handleReply = this.handleReply.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  componentDidMount() {
    const data = new FormData()
    data.append('reply_to', this.props.comment.id)
    axios.post(`/api/comments/${this.props.article.id}`, data)
      .then((res) => this.setState(
        produce(this.state, draft => {
          draft.replies = res.data
      })))
      .then(() => console.log(this.state))
  }
  handleReply(e) {
    if(e.target.dataset.label === 'replies') {
      this.setState({ isReply: true });
    }else {
      this.setState({ isReply: false });
    }
  }
  handleChange(e) {
    this.setState({ comment: e.target.value });
  }
  handleCommentSubmit(e) {
    let data = new FormData();
    data.append('article_id', this.props.article.id);
    data.append('comment', this.state.comment);
    data.append('reply_to', this.props.comment.id);
    data.append('user_id', this.props.user);
    axios.post('/api/comments', data)
      .then(() => axios.post(`/api/comments/${this.props.article.id}`, data))
      .then((res) => this.setState(
        produce(this.state, draft => {
          draft.comment = '';
          draft.replies = res.data;
        })
      ))
  }
  handleEdit(e) {
    if(this.props.user == e.target.dataset.user && e.target.dataset.label === 'comment-edit') {
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

  render() {

    return(
      <div className="comment">
        <div className="head">
          <a href="#"><img className="circle" style={{backgroundColor: '#000'}}></img></a>
          <div className="name-and-date">
            <a href="#">{this.props.comment.user.name}</a>
            <div>
            {this.props.comment.updated_at > this.props.comment.created_at ?
              <div><TimeAgo date={this.props.comment.updated_at} formatter={formatter} />
              <span>에 수정됨</span></div> : 
              <TimeAgo date={this.props.comment.created_at} formatter={formatter} /> }
            </div>
          </div>
          {this.props.user === this.props.comment.user.id &&
            <div className="btns">
              <span
                data-label="comment-edit"
                data-id={this.props.comment.id}
                data-user={this.props.comment.user.id}
                onClick={this.handleEdit}>수정</span>
              <span
                data-id={this.props.comment.id}
                data-user={this.props.comment.user.id}
                onClick={this.props.handleCommentRemove}>삭제</span>
            </div>
          }
        </div>
        <div className="body">{this.props.comment.comment.split('\n').map((line, i) => (
          <span key={i}>{line}<br/></span>
        ))}</div>
        {!this.state.isReply ? 
          this.state.replies.length > 0 ? <span className="replies-button" data-label="replies" onClick={this.handleReply}>{this.state.replies.length}개의 답글</span> :
            <span className="replies-button" data-label="replies" onClick={this.handleReply}>답글 달기</span> :
          <span className="replies-button" onClick={this.handleReply}>숨기기</span>
        }
        {this.state.isReply?
        <div className="replies">
          {this.state.replies.map((reply, i) => (
            <div key={i} className="comment">
              <div className="head">
                <a href="#"><img className="circle" style={{backgroundColor: '#000'}}></img></a>
                <div className="name-and-date">
                  <a href="#">{reply.user.name}</a>
                  <div>
                  {reply.updated_at > reply.created_at ?
                    <div><TimeAgo date={reply.updated_at} formatter={formatter} />
                    <span>에 수정됨</span></div> : 
                    <TimeAgo date={reply.created_at} formatter={formatter} /> }
                  </div>
                </div>
                {this.props.user === reply.user.id &&
                  <div className="btns">
                    <span
                      data-label="comment-edit"
                      data-id={reply.id}
                      data-user={reply.user.id}
                      onClick={this.handleEdit}>수정</span>
                    <span
                      data-id={reply.id}
                      data-user={reply.user.id}
                      onClick={this.props.handleCommentRemove}>삭제</span>
                  </div>
                }
              </div>
              <div className="body">{reply.comment.split('\n').map((line, i) => (
                <span key={i}>{line}<br/></span>
              ))}</div>
            </div>))}
            <textarea rows="1" style={{ height: '53px' }}
              name="submit"
              onFocus={this.props.handleFocus}
              onBlur={this.props.handleBlur}
              onKeyUp={this.props.handleHeight}
              onChange={this.handleChange}
              value={this.state.comment}
            />
            <div className="btn-wrapepr">
              <Button onClick={this.handleCommentSubmit}>댓글 작성</Button>
            </div>
          </div>
        : undefined}
      </div>
    )}
  
}

export default PostComment;