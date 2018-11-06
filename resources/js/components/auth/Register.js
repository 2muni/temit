import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({
  handleSubmit,
  handleChange,
  state
}) => (
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
            onChange={handleChange}
            value={state.name}
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
            onChange={handleChange}
            value={state.email}
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
            onChange={handleChange}
            value={state.password}
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
            onChange={handleChange}
            value={state.password_confirmation}
            required
          />
        </div>
        <button onClick={handleSubmit} className="waves-effect waves-light btn">로그인</button>
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
)

export default Register