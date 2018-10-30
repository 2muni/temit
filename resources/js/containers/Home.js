import React, { Component } from 'react';
import { PostList, Preloader } from '../components';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../store/modules/article'
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props)
    this.page = 1;

    this.state = {
      isLoading: false,
      list: [],
      tag: '',
    }

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.tag){
      axios.get(`/api/tags/${this.props.match.params.tag}`)
        .then((res) => {
          this.setState({ list: res.data.articles })
          this.setState({ tag: res.data.tag })
        })
    }else {
      this.props.ArticleActions.listRequest(this.page)
        .then(() => this.setState({ list: this.props.articleList.data }))
        .then(() => window.addEventListener('scroll', this.onScroll, false));
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
      console.log('scroll');
      this.setState({isLoading: true});
      this.page++;
      this.props.ArticleActions.listRequest(this.page)
      .then(() => this.setState({ list: this.state.list.concat(this.props.articleList.data) }))
      .then(() => this.setState({isLoading: false}));
    }
  }

  render() {
    if(this.props.match.params.tag)
    return (
      <div className="content-wrapper">
        <div className="posts-column">
        
          {this.state.tag ? 
          <div className="tag-header">#{this.state.tag}</div> : <Preloader/>}
          <PostList list={this.state.list}/>
        </div>
        <div className="main-column right">
          <div className="user-profile">
            <div className="user-img-0">
              <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
            </div>
            <div className="user-name">{this.props.status.username}</div>
          </div>
          <div className="main-nav">
            <Link to="/post">글쓰기</Link>
          </div>
        </div>
      </div>
    );
    else
    return (
      <div className="content-wrapper">
        <div className="posts-column">
          <PostList list={this.state.list}/>
          <Preloader/>
        </div>
        <div className="main-column right">
          <div className="user-profile">
            <div className="user-img-0">
              <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
            </div>
            <div className="user-name">{this.props.status.username}</div>
          </div>
          <div className="main-nav">
            <Link to="/post">글쓰기</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.user.status,
  articleList: state.article.list
});

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);