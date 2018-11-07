import React, { Component, Fragment } from 'react';
import { PostList } from '../../components/post/PostList';
import { Preloader } from '../../components/etc'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../store/modules/article';
import axios from 'axios';
import produce from 'immer';

class PostListContainer extends Component {

  constructor(props) {
    super(props)
    this.page = 1;

    this.state = {
      isLoading: true,
      list: [],
      tag: '',
    }

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    
    if(this.props.tag){
      axios.get(`/api/tags/${this.props.tag}`)
        .then((res) => this.setState(produce(this.state, draft => {
          draft.list = res.data.articles;
          draft.tag = res.data.tag;
          draft.isLoading = false;
        })))
        .then(() => window.addEventListener('scroll', this.onScroll, false))
    }else {
      this.props.ArticleActions.listRequest(this.page)
        .then(() => this.setState(produce(this.state, draft => {
          draft.list = this.props.articleList.data;
          draft.isLoading = false;
        })))
        .then(() => window.addEventListener('scroll', this.onScroll, false))
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.isLoading !== this.state.isLoading
    )
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if(
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 800) &&
      this.state.list.length && !this.state.isLoading
    ) {
      this.setState(produce(this.state, draft => { draft.isLoading = true }));
      this.page++;
      this.props.ArticleActions.listRequest(this.page)
      .then(() => this.setState(produce(this.state, draft => {
        draft.list = this.state.list.concat(this.props.articleList.data);
        draft.isLoading = false;
      })))
    }
  }

  render() {
    return(
      <div className="post-column">          
      {this.props.tag ? <div className="tag-header">#{this.state.tag}</div> : undefined }
        <PostList list={this.state.list}/>
        {this.state.isLoading ? <Preloader/> : undefined }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.authentication.status.currentUser,
  articleList: state.article.list
});

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);