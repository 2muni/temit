import React, { Component } from 'react';
import { PostList } from '../components';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // axios.get('/api/usercheck').then(res=>console.log(res)).catch(err=>console.log(err));
    const data = new FormData;
    data.append('_token', 'gZ86NapCYe7vIrpEewumlCERKac9P5IRAP9UY7iG');
    axios.post('/logout', data).then(console.log(success)).catch(err=>console.log(err))
  }


  render() {
    return (
      <div className="content-wrapper">
        <div className="posts-column">
          <PostList/>
        </div>
        <div className="main-column right">
          <div className="user-profile">
            <div className="user-img-0">
              <img className="circle user-img-0" alt="user-profile" src="https://www.worldcrunch.com/assets/img/avatars/thumbnails/default-user-img-profile.jpg"/>
            </div>
            <div className="user-name">relesinc</div>
          </div>
          <Link to="/login">login</Link>
          <div onClick={this.handleClick}>view</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);