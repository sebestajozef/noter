import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'

import {sagaMiddleware, store} from './store'
import rootSaga from './rootSaga'
import HomePage from './pages/HomePage'


import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
} from 'react-switch-lang'

import en from './translations/en.json'
import cz from './translations/cz.json'
import Cookies from 'js-cookie'

sagaMiddleware.run(rootSaga)

setTranslations({en, cz})
setDefaultLanguage(Cookies.get('language') || 'en')

setLanguageCookie()

class _App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={HomePage} />
        </Router>
      </Provider>
    )
  }
}

export default _App
