// So make this a compoent and use connect to put props in Redux?

import createAuth0Client from '@auth0/auth0-spa-js'
import config from 'config'
// eslint-disable-next-line
import { green }  from './logger'

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

export let isAuthenticated = false
export let user = undefined
export let auth0Client = undefined
export let loading = true
export let popupOpen = false

const init = () => {
  auth0Client = await createAuth0Client({
    client_id: config.auth0.client_id,
    domain: config.auth0.domain,
    redirect_uri: config.auth0.redirect_uri
  })

  if (window.location.search.includes('code=')) {
    const { appState } = await auth0.handleRedirectCallback()
    onRedirectCallback(appState)
  }

  isAuthenticated = await auth0.isAuthenticated()

  user = isAuthenticated
    ? await auth0.getUser()
    : undefined

  loading = false
}

const loginWithPopup = async (params = {}) => {
    // green('loginWityPopup')
    popupOpen = true
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      popupOpen = false
    }
    user = await auth0Client.getUser()
    isAuthenticated = true
  }

const handleRedirectCallback = async () => {
  // green('handleRedirectCallback')
  loading = true
  await auth0Client.handleRedirectCallback()
  user = await auth0Client.getUser()
  loading = false
  isAuthenticated = true
}






























