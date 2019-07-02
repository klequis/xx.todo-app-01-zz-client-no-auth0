import auth0 from 'auth0-js'
import { green } from 'logger'

class Auth {
  constructor() {
    green('domain', process.env.DOMAIN)
    green('client id', process.env.CLIENT_ID)
    this.auth0 = new auth0.WebAuth({
      domain: process.env.DOMAIN,
      audience: `https://${process.env.DOMAIN}/userinfo`,
      clientID: process.env.CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI,
      responseType: process.env.RESPONSE_TYPE,
      scope: process.env.SCOPE
    })

    this.getProfile = this.getProfile.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
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
