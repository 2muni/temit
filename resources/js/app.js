import React from 'react';
import ReactDOM from 'react-dom';

import HeaderContainer from './containers/Base/HeaderContainer';
import { Login, Register, Post, Write, Board, Home } from './pages'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk))

if (document.getElementById('root')) {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <React.Fragment>
            <Route path='/' component={HeaderContainer}/>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <Route path='/write/:id' component={Write}/>
              <Route path='/write' component={Write}/>
              <Route path='/post/:id' component={Post}/>
              <Route path='/board/:tag' component={Board}/>
              <Route path='/board' component={Board}/>
              <Route path='/' component={Home}/>
            </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  , document.getElementById('root'));
}
