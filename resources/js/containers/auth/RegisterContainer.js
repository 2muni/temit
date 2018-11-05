import React, { Component } from 'react';
import axios from 'axios';
import produce from 'immer';
import { Link } from 'react-router-dom';

class RegisterContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
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
    const data = this.state;
    console.log(data);
    axios.post('/api/auth/signup', data, {
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
                <label htmlFor="name">이름</label>
                <input
                  id="name"
                  type="text"
                  className="validate"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  required autoFocus
                />
              </div>
              <div className="input-field email">
                <label htmlFor="email">이메일</label>
                <input
                  id="email"
                  type="email"
                  className="validate"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
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
              <div className="input-field">
                <label htmlFor="password_confirmation">비밀번호 확인</label>
                <input
                  id="password_confirmation"
                  type="password"
                  className="validate"
                  name="password_confirmation"
                  onChange={this.handleChange}
                  value={this.state.password_confirmation}
                  required
                />
              </div>
              <button onClick={this.handleSubmit} className="waves-effect waves-light btn">로그인</button>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="center" >
              계정이 있으신가요? <Link to='/login'>로그인</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterContainer;