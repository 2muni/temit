import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-materialize'

const EditorNav = ({
  handleSubmitCard
}) => (
  <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">temit</Link>
      <ul className="right">
        <li><Button className="btn post" onClick={handleSubmitCard}>작성하기</Button></li>
      </ul>
    </div>
  </nav>
)

export default EditorNav