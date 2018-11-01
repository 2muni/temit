import React, { Component, Fragment } from 'react';
import { Header } from '../../components/base'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/modules/user';
import { getMetaData } from '../../lib/auth'

class HeaderContainer extends Component {

  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.UserActions.getStatusRequest(getMetaData('user'));
  }

  handleLogout() {
    const data = new FormData;
    this.props.UserActions.logoutRequest(data);
  }

  render() {

    const path = /(login|register|write)/;
    const isHidden = path.test(this.props.location.pathname);

    return (
      isHidden ? <Fragment></Fragment> : 
      <Header
        handleLogout={this.handleLogout}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.user.status
})

const mapDispatchToProps = (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
