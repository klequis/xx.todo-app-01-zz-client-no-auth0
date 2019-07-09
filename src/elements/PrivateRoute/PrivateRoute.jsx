import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { useAuth0 } from 'react-auth0-spa'
// eslint-disable-next-line
import { green } from 'logger'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  green('typeof Component', typeof Component)
  green('isAuthenticated', isAuthenticated)

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: path }
        })
      }
    }
    fn()
  }, [isAuthenticated, loginWithRedirect, path])

  const render = props => <Component {...props} />

  return <Route path={path} render={render} {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
}

export default PrivateRoute

/*
https://undefined/
authorize?redirect_uri=http%3A%2F%2Flocalhost%3A3000&
scope=openid%20profile%20email&
response_type=code&
response_mode=query&
state=c2hGLUFlaE4teTV2SzJmWXh5RjFZLkZRZ3Z5Z1pHNDNxLUdPbm1RYUxxeQ%3D%3D&
nonce=a7d7dMs2h-sdPi8_p3BU.43gQwsG9UjZ.nBYQnZeiAA&
code_challenge=4v7EI53yZpHa5qiH_aOkenQvoexXV5-ihx9oE5QzWhE&
code_challenge_method=S256&
auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMC4yIn0%3D
*/