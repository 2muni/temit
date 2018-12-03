import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({
  handleChange,
  handleSubmit,
  handleSocial,
  handleKeyPress,
  state
}) => (
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
            onChange={handleChange}
            value={state.email}
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
          onChange={handleChange}
          value={state.password}
          onKeyPress={handleKeyPress}
          required
        />
        </div>
        <button onClick={handleSubmit} className="waves-effect waves-light btn">로그인</button>
          <div className="login-divider">
            <div className="line"></div>
            <div className="text">또는</div>
            <div className="line"></div>
          </div>
        <div className="socials-wrapper">
          <a href="/google/redirect" className="google waves-effect waves-light btn">
            <i class="fab fa-google"></i>Google 로그인
          </a>
          <a href="/github/redirect" className="github waves-effect waves-light btn">
            <i class="fab fa-github"></i>Github 로그인
          </a>
        </div>
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
)

export default Login;