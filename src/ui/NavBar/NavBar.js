import React from 'react'
import { useAuth0 } from 'react-auth0-spa'
import { Link, withRouter } from 'react-router-dom'
// eslint-disable-next-line
import { green } from 'logger'

const styles = {
  wrapper: {
    display: 'flex'
  }
}

function NavBar(props) {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    })

  return (
    <nav
      style={styles.wrapper}
      className="navbar navbar-dark bg-primary fixed-top"
    >
      {!isAuthenticated && (
        <button
          className="btn btn-dark"
          onClick={() => loginWithRedirect({})}
        >
          Sign In
        </button>
      )}

      {isAuthenticated && (
        <div>
          {/* <img
            src={user.picture}
            alt="Profile"
            className="nav-user-profile"
          /> */}
          {/* <label className="mr-2 text-white">{user.nickname}</label> */}
          <button
            className="btn btn-dark"
            onClick={() => logoutWithRedirect()}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  )
}

export default withRouter(NavBar)
