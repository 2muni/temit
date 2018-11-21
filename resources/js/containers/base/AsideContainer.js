import React, { Component } from 'react'
import { AsideNav } from '../../components/base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/modules/user'

class AsideContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFixed: false,
      followees: []
    }

    this.handleFixed = this.handleFixed.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleFixed, false)
    this.props.UserActions.userRequest(this.props.user.id)
    .then(() => this.setState({
      followees: this.props.currentUser.followees
    }))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isFixed !== this.state.isFixed
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleFixed, false)
  }

  handleFixed() {
    if(window.scrollY < 100 && this.state.isFixed )
      this.setState({ isFixed: false })
    else if(window.scrollY > 99 && !this.state.isFixed)
      this.setState({ isFixed: true })
  }

  render() {
    return(
      <AsideNav
        isFixed={this.state.isFixed}
        user={this.props.user}
        items={this.props.items}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.get.user,
})

const mapDispatchToProps = (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AsideContainer);