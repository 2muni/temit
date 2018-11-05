import React, { Component } from 'react';
import axios from 'axios';
import produce from 'immer';
import { Link } from 'react-router-dom';

class LoginContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState(produce(this.state, draft => {
      draft[e.target.name] = e.target.value
    }))
  }

  handleSubmit() {
    const data = {
      'email': this.state.email,
      'password': this.state.password,
      'remember_me': true
    }
    axios.post('/api/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }})
    .then((res) => console.log(res));
  }

  render() {
    console.log('login page')
    return(
      <div className="auth">
        <div className="logo">temit</div>
        <div className="card">
          <div className="card-content">
              <div className="input-field email">
                <label htmlFor="email">이메일</label>
                <input
                  id="email"
                  type="email"
                  className="validate"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required autoFocus
                />
              </div>
              <div className="input-field">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                className="validate"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                required
              />
              </div>
              <button onClick={this.handleSubmit} className="waves-effect waves-light btn">로그인</button>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="center" >
              계정이 없으신가요? <Link to="/register">회원가입</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginContainer;