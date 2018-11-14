import React, { Component } from 'react';
import { SSItem } from '../../components/snapshot/SSItem';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as snapshotActions from '../../store/modules/snapshot'

import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-materialize';

class SnapshotContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isFixed: false,
      body: '',
      preview: '',
    }
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
  }

  render() {
    return(
      <div className="snapshot-column">
        <SSItem/>
        <SSItem/>
        <Link to='/upload'>
          <Button floating icon='add_a_photo' className='floatBtn circle' large style={{bottom: '45px', right: '45px'}}/>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  snapshotList: state.snapshot.get.data
})

const mapDispatchToProps = (dispatch) => ({
  SnapshotActions: bindActionCreators(snapshotActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotContainer);
