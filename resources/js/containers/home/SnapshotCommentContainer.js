import React, { Component } from 'react'
import { connect } from 'redux-actions'
import { bindActionCreators } from 'redux'

class SnapshotCommentContainer extends Component{
  render() {
    return(
      <div></div>
    )
  }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = () => ({

})

export default connect (mapStateToProps,mapDispatchToProps)(SnapshotCommentContainer)