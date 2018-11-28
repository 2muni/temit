import React, { Component } from 'react'
import ChatContainer from './ChatContainer'
import { AsideNav } from '../../components/base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/modules/user'

class AsideContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFixed: false,
      enterdChats: [],
    }

    this.handleFixed = this.handleFixed.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleFixed, false)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isFixed !== this.state.isFixed || nextProps.currentUser !== this.props.currentUser
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
      <React.Fragment>
      {this.props.currentUser ? 
        <React.Fragment>
          <AsideNav
            isFixed={this.state.isFixed}
            user={this.props.currentUser}
            followees={this.props.currentUser.followees}
          />
          {this.state.enterdChats.map((room, i) => (
            <ChatContainer
              index={i}
              room={room}
            />
          ))}
        </React.Fragment>
      : undefined}
      </React.Fragment>      
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.get.user,
  currentUser: state.authentication.status.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AsideContainer);