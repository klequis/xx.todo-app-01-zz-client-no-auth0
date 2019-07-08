import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Auth0Provider } from './react-auth0-spa'
import config from 'config'
import configureStore from './store/configureStore'
import './index.css'
import App from 'ui/App'

import { green } from 'logger'



const store = configureStore()

const onRedirectCallback = appState => {
  green('onRedirectCallback')
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const renderApp = () =>
  render(
    <Provider store={store}>
      <Auth0Provider
        client_id={config.clientId}
        domain={config.domain}
        onRedirectCallback={onRedirectCallback}
        redirect_uri={window.location.origin}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </Provider>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('ui/App', renderApp)
}

renderApp()
