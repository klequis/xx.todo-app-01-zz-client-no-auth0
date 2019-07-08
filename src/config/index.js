const domain = 'klequis-todo.auth0.com'

const config = {
  auth0: {
    domain: domain,
    audience: `https://${domain}/userinfo`,
    clientId: 'Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'id_token',
    scope: 'openid profile'
  }
}

export default config