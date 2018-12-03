import React, { Component } from 'react'
import ChatContainer from './ChatContainer'
import { AsideNav } from '../../components/base/AsideNav'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { produce } from 'immer'
import * as userActions from '../../store/modules/user'

class AsideContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFixed: false,
      activeChats: [],
    }

    this.handleFixed = this.handleFixed.bind(this);
    this.enterChatRoom = this.enterChatRoom.bind(this);
    this.quitChatRoom = this.quitChatRoom.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleFixed, false)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isFixed !== this.state.isFixed || 
           nextProps.currentUser !== this.props.currentUser ||
           nextState.activeChats !== this.state.activeChats
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

  enterChatRoom(e) {
    for(let index in this.state.activeChats) {
      if(e.target.dataset.room === this.state.activeChats[index])
        return
    }
    this.setState(produce(this.state, draft => {
      draft.activeChats.push(e.target.dataset.room);
    }))
  }

  quitChatRoom(e) {
    this.setState(produce(this.state, draft => {
          draft.activeChats.splice(e.target.dataset.index, 1);
        }))
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
            enterChatRoom={this.enterChatRoom}
          />
          {this.state.activeChats.map((room, i) => (
            <ChatContainer
              key={i}
              index={i}
              currentUser={this.props.currentUser}
              otherPerson={this.props.currentUser.followees[room]}
              room={this.props.currentUser.followees[room].id * this.props.currentUser.id}
              quitChatRoom={this.quitChatRoom}
            />
          ))}
        </React.Fragment>
      : undefined}
      </React.Fragment>      
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authentication.status.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AsideContainer);