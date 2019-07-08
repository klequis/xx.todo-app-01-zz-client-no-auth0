import auth0 from 'auth0-js'
// import config from 'config'

import { green } from 'logger'

class Auth {
  constructor() {
    // this.auth0 = new auth0.WebAuth({
      // domain: config.auth0.domain,
      // audience: config.auth0.audience,
      // clientID: config.auth0.clientId,
      // redirectUri: config.auth0.redirectUri,
      // responseType: config.auth0.responseType,
      // scope: config.auth0.scope
    // })
    this.auth0 = new auth0.WebAuth({
      domain: 'klequis-todo.auth0.com',
      audience: 'https://klequis-todo.auth0.com/userinfo',
      clientID: 'Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token',
      scope: 'openid profile'
    })

    this.getProfile = this.getProfile.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    green('this', this)
  }

  getProfile() {
    console.log('profile', this.profile)
    return this.profile
  }

  getIdToken() {
    return this.idToken
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt
  }

  signIn() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err)
        if (!authResult || !authResult.idToken) {
          return reject(err)
        }
        this.idToken = authResult.idToken
        this.profile = authResult.idTokenPayload
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000
        resolve()
      })
    })
  }

  signOut() {
    // clear id token, profile, and expiration
    this.idToken = null
    this.profile = null
    this.expiresAt = null
  }
}

const auth0Client = new Auth()

export default auth0Client
