import React, { Component } from 'react'
import { AsideNav } from '../../components/base'

class AsideContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFixed: false
    }

    this.handleFixed = this.handleFixed.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleFixed, false)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.isFixed !== this.state.isFixed)
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

export default AsideContainer;