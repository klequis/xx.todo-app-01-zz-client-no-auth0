import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './index.css'
import App from 'ui/App'

const store = configureStore()

const renderApp = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('ui/App', renderApp)
}

renderApp()
