import React from 'react';
import ReactDOM from 'react-dom';
import './scss/App.scss';
import { App, Home } from './containers';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
ReactDOM.render(
  <Router>
    <>
      <Route path='/' component={App}/>
      <div className="content-wrapper">
        <Route exact path='/' component={Home}/>
      </div>
    </>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
