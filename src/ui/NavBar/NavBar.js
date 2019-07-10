import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  isAuthenticated,
  loginWithPopup,
  logoutWithRedirect,
  user
} from 'react-auth0-spa-2'
// eslint-disable-next-line
import { green } from 'logger'



const styles = {
  wrapper: {
    display: 'flex'
  }
}

function NavBar(props) {
  green('NavBar: isAuthenticated', isAuthenticated)
  green('NavBar: user', user)

  const handleLogoutClick = () => {
    logoutWithRedirect({
      returnTo: window.location.origin
    })
  }

  const handleLoginClick = () => {
    loginWithPopup()
  }

  return (
    <nav
      style={styles.wrapper}
      className="navbar navbar-dark bg-primary fixed-top"
    >
      <h3>nav bar</h3>
      {!isAuthenticated && (
        <button className="btn btn-dark" onClick={handleLoginClick}>
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
          <button className="btn btn-dark" onClick={handleLogoutClick}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  )
}

export default withRouter(NavBar)
