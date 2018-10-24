import React, { Component } from 'react';
import { PostList } from '../components';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../store/modules/article'

class Home extends Component {

  constructor(props) {
    super(props)
    this.page = 1;

    this.state = {
      isLoading: false,
      list: []
    }

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.props.ArticleActions.listRequest(this.page)
    .then(() => this.setState({ list: this.props.articleList.data }))
    .then(() => window.addEventListener('scroll', this.onScroll, false));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 800) &&
      this.state.list.length &&
      !this.state.isLoading
    ) {
      this.setState({isLoading: true});
      this.page++;
      this.props.ArticleActions.listRequest(this.page)
      .then(() => this.setState({list: this.state.list.concat(this.props.articleList.data)}))
      .then(() => this.setState({isLoading: false}));
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="posts-column">
          <PostList list={this.state.list}/>
        </div>
        <div className="main-column right">
          <div className="user-profile">
            <div className="user-img-0">
              <img className="circle user-img-0" alt="user-profile" src="https://www.worldcrunch.com/assets/img/avatars/thumbnails/default-user-img-profile.jpg"/>
            </div>
            <div className="user-name">{this.props.status.username}</div>
          </div>
          <Link to="/post">글쓰기</Link>
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