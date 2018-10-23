import React from 'react';
import ReactDOM from 'react-dom';

import { App, Register, Login, Home, Editor } from './containers';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store';
import thunk from 'redux-thunk';

import { getCookie } from './lib/auth';

const store = createStore(reducers, applyMiddleware(thunk))

if (document.getElementById('root')) {
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route path='/' component={App}/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/post' component={Editor}/>
      </React.Fragment>
    </Router>
  </Provider>
, document.getElementById('root'));
}

