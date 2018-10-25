import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../store/modules/article'

import { Post } from '../components'

class Article extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  componentDidMount() {
    this.props.ArticleActions.getRequest(this.props.match.params.id)
  }

//<Post article={this.state.data}/>

  render() {
    if(this.props.articleData)
      return <Post article={this.props.articleData}/>
    else
      return <div></div>
  }
}

const mapStateToProps = (state) => ({
  articleData: state.article.get.data
})

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);