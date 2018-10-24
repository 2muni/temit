
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { App, Home, Editor, Article } from './containers';
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
            <Route path='/' component={App}/>
            <Switch>
              <Route path='/post' component={Editor}/>
              <Route path='/articles/:id' component={Article}/>
              <Route path='/' component={Home}/>
            </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  , document.getElementById('root'));
}
