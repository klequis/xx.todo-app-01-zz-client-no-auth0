// So make this a compoent and use connect to put props in Redux?


import createAuth0Client from '@auth0/auth0-spa-js'
import config from 'config'
// eslint-disable-next-line
import { green, red }  from './logger'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

/*
{
  "client_id": "Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI",
  "domain": "klequis-todo.auth0.com",
  "redirect_uri": "http://localhost:3000"
}
*/

// Not having isLoading in the code will likely introduce a timing issue. 
// Should this be handled in Redux?
// Should the settings being managed via hooks in the orig example be in Redux?
// ** I think I solved this by having renderApp in index.js be async and putting in it `await init(onRedirectCallback)`

export let isAuthenticated = false
export let user = undefined
export let auth0Client = undefined
export let isLoading = true
export let popupOpen = false

export const init = async (onRedirectCallback = DEFAULT_REDIRECT_CALLBACK) => {
  // green('init')
  // green('one')
  // green('config', config)
  // const clientId = config.auth0.client_id
  // green('client_id', clientId)
  // const domain = config.auth0.domain
  // green('domain', domain)
  // const redirectUri = config.auth0.redirect_uri
  // green('redirect_uri', redirectUri)
  try {
    auth0Client = await createAuth0Client({
      client_id: config.auth0.clientId,
      domain: config.auth0.domain,
      redirect_uri: config.auth0.redirectUri
    })
    // green('two')
    // green('auth0Client', auth0Client)

    if (window.location.search.includes('code=')) {
      const { appState } = await auth0Client.handleRedirectCallback()
      onRedirectCallback(appState)
    }
    // green('three')
    isAuthenticated = await auth0Client.isAuthenticated()
    // green('isAuthenticated', isAuthenticated)
    user = isAuthenticated
      ? await auth0Client.getUser()
      : undefined
    // green('user', user)
  } catch (e) {
     red('react-auth0-spa-2.init Error: ', e)
  } finally {
    // green('react-auth0-spa-2.init: finally')
    isLoading = false
  }
  
}

export const loginWithPopup = async (params = {}) => {
    popupOpen = true
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      red('loginWithPopup Error:', error)
    } finally {
      popupOpen = false
    }
    user = await auth0Client.getUser()
    isAuthenticated = true
  }

export const handleRedirectCallback = async () => {
  // green('handleRedirectCallback')
  isLoading = true
  await auth0Client.handleRedirectCallback()
  user = await auth0Client.getUser()
  isLoading = false
  isAuthenticated = true
}

export const logoutWithRedirect = (...params) => auth0Client.logout(...params)



























