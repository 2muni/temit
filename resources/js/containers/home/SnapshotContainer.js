import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SSItem } from '../../components/snapshot/SSItem';

class SnapshotContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      reply: null,
    }
  }

  render() {
    if(this.props.data.uri)
      return(
        <SSItem
          data={this.props.data}
          isSnapshot={true}
        />
      )
    else
      return(
        <SSItem
          data={this.props.data}
          isSnapshot={false}
        />
      )        
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotContainer)