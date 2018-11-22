import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SSItem } from '../../components/snapshot/SSItem';
import { SSReplies } from '../../components/snapshot/SSReplies'
import { produce } from 'immer'
import * as commentActions from '../../store/modules/snapshot_comment'

class SnapshotContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      comment: '',
      list:[],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.handleCommentRemove = this.handleCommentRemove.bind(this)
  }

  componentDidMount() {
    if(this.props.snapshot.hasOwnProperty('uri'))
      this.props.CommentActions.listRequest(this.props.snapshot.id)
      .then(() => console.log(this.props.commentData))
      .then(() => this.setState({ list: this.props.commentData }))
  }

  handleCommentSubmit() {
    let data = new FormData();
    data.append('snapshot_id', this.props.snapshot.id);
    data.append('comment', this.state.comment);
    data.append('user_id', this.props.user.id);
    this.props.CommentActions.postRequest(data)
    .then(() => this.props.CommentActions.listRequest(this.props.snapshot.id))
    .then(() => this.setState(
      produce(this.state, draft => {
        draft.comment = '';
        draft.list = this.props.commentData;
      })
    ))
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }

  handleCommentRemove(e) {
    if(this.props.user.id == e.target.dataset.user) {
      confirm("댓글을 삭제하시겠습니까?") && 
      this.props.CommentActions.removeRequest(e.target.dataset.id)
      .then(() => this.props.CommentActions.listRequest(this.props.snapshot.id))
      .then(() => this.setState({ list: this.props.commentData }))
    }
  }

  render() {
    if(this.props.snapshot.hasOwnProperty('uri'))
      return(
        <div className="snapshot-item">
          <SSItem
            data={this.props.snapshot}
            isSnapshot={true}
          />
          <SSReplies
            list={this.state.list}
            user={this.props.user}
            comment={this.state.comment}
            handleChange={this.handleChange}
            handleSubmit={this.handleCommentSubmit}
            handleRemove={this.handleCommentRemove}
          />
        </div>
      )
    else
      return(
        <div className="snapshot-item">
          <SSItem
            data={this.props.snapshot}
            isSnapshot={false}
          />
        </div>
      )        
  }
}

const mapStateToProps = (state) => ({
  commentData: state.snapshot_comment.list.data,
})

const mapDispatchToProps = (dispatch) => ({
  CommentActions: bindActionCreators(commentActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotContainer)