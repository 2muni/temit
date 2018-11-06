import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'react-materialize'

class AsideNav extends Component {

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
    return (
      nextState.isFixed !== this.state.isFixed ||
      nextProps.user !== this.props.user
    )
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
      <aside className="aside-nav">
        <div className="fixed-frame" style={ this.state.isFixed ? {position: 'fixed', top: '11px'} : {position: 'static'} }>
          <div className="user-profile">
            <div className="user-img-0">
              <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
            </div>
            <div className="user-name">{this.props.user.name}</div>
          </div>
          <ul className="aside-navitem">
          {this.props.items.map((item, i)=>(
            <li key={i}><Link to={`${item.link}`}><Icon>{`${item.icon}`}</Icon>{`${item.label}`}</Link></li>
          ))}
          </ul>
        </div>
      </aside>
    )
  }
}

export default AsideNav