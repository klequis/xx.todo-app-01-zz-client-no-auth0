import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUser, getIsAuthenticated } from 'store/auth/selectors'
import { setUser, setIsAuthenticated } from 'store/auth/actions'
import { user, isAuthenticated } from 'react-auth0-spa-2'
import {
  BrowserRouter as Router /*, Route, Link, Switch */
} from 'react-router-dom'
import './App.css'
import DevTools from 'ui/DevTools'
import NavBar from 'ui/NavBar'

// import Home from 'ui/Home'
// import PrivateRoute from 'elements/PrivateRoute'

// eslint-disable-next-line
import { green, red } from 'logger'

const devToolStyle = {
  textAlign: 'left'
}

const App = props => {
  green('App: user', user)
  green('App: isAuthenticated', isAuthenticated)
  useEffect(() => {
    green('useEffect')
    setUser(user)
    setIsAuthenticated(isAuthenticated)
  })

  return (
    <div className="App">
      <h1>Hi from App</h1>
      isAuthenticated: {isAuthenticated() ? 'yes' : 'no'}
      {/* <Todos /> */}
      {/* <button onClick={handleLoginClick}>Login</button> */}
      {/* <button onClick={handleLogoutClick}>Log out</button> */}
      <Router>
        <NavBar isAuthenticated={isAuthenticated} />
        {/* <header className="App-header"> */}
        {/* <Link to='/todos'>Todos</Link> */}
        {/* <Switch> */}
        {/* <Route exact path='/' component={Home} /> */}
        {/* <PrivateRoute path='/todos' component={Todos} /> */}
        {/* </Switch> */}
        {/* </header> */}
      </Router>
      <div style={devToolStyle}>
        <DevTools />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  
  return {
    user: getUser(state),
    isAuthenticated: getIsAuthenticated(state)
  }
}

const actions = { setUser, setIsAuthenticated }

export default connect(mapStateToProps, actions)(App)
