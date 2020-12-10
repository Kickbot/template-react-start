/* eslint-disable import/no-unassigned-import */
import 'core-js/stable/array/includes'
import 'core-js/stable/array/find'
import 'core-js/stable/array/from'
import 'core-js/stable/object/assign'
import 'core-js/stable/object/values'
import 'core-js/stable/object/entries'
import 'core-js/stable/object/from-entries'
import 'core-js/stable/symbol'
import 'core-js/stable/set'
import 'core-js/stable/promise'
import 'core-js/stable/url-search-params'
import 'whatwg-fetch'
/* eslint-enable import/no-unassigned-import */

import './theme.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import createStore from './store'

import routes  from './const/routes'
// import Header from './pages/Header'
import LandingPage from './pages/LandingPage';



export const store = createStore()

export const mainElement = document.createElement('div')
mainElement.className = 'main'
document.body.appendChild(mainElement)



ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route exact path={routes.landing} component={LandingPage} />
        <Redirect to={routes.landing} />
      </Switch>
    </Router>
  </Provider>,
  mainElement,
)
