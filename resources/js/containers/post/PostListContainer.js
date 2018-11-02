import React, { Component, Fragment } from 'react';
import { PostList } from '../../components/post/PostList';
import { PostNav } from '../../components/post/PostNav';
import { Preloader } from '../../components/etc'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../store/modules/article'
import axios from 'axios';

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
        .then((res) => {
          this.setState({ list: res.data.articles })
          this.setState({ tag: res.data.tag })
          this.setState({ isLoading: false })
        })
    }else {
      this.props.ArticleActions.listRequest(this.page)
        .then(() => this.setState({ list: this.props.articleList.data }))
        .then(() => window.addEventListener('scroll', this.onScroll, false))
        .then(() => this.setState({ isLoading: false }))
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 800) &&
      this.state.list.length && !this.state.isLoading
    ) {
      this.setState({ isLoading: true });
      this.page++;
      this.props.ArticleActions.listRequest(this.page)
      .then(() => this.setState({ list: this.state.list.concat(this.props.articleList.data) }))
      .then(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    return(
      this.props.tag ? 
        <Fragment>
          <PostNav user={this.props.status}/>
          <div className="posts-column">
            <div className="tag-header">#{this.state.tag}</div> 
            <PostList list={this.state.list}/>
            {this.state.isLoading ? <Preloader/> : undefined }
          </div>
        </Fragment>
      : <Fragment>
          <PostNav user={this.props.status}/>
          <div className="posts-column">
            <PostList list={this.state.list}/>
            {this.state.isLoading ? <Preloader/> : undefined }
          </div>
        </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  status: state.user.status,
  articleList: state.article.list
});

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);