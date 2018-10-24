import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../store/modules/article'

import { Post } from '../components'

class Article extends Component {

  constructor(props) {
    super(props);

    this.state = {
     // state 
    }
  }

  componentDidMount() {
    this.props.ArticleActions.getRequest(this.props.match.params.id)
  }

  render() {
    return(
      <Post article={this.props.article.data}/>
    )
  }
}

const mapStateToProps = (state) => ({
  article: state.article.get
})

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);