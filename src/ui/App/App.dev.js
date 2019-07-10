import React from 'react'
import { BrowserRouter as Router /*, Route, Link, Switch */ } from 'react-router-dom'
import './App.css'
import DevTools from 'ui/DevTools'
// import Todos from 'ui/Todos'
import NavBar from 'ui/NavBar'
// import Home from 'ui/Home'
// import PrivateRoute from 'elements/PrivateRoute'
// import { loginWithPopup, logout } from 'react-auth0-spa-2'
// eslint-disable-next-line
import { green, red } from 'logger'

const devToolStyle = {
  textAlign: 'left'
}

const App = props => {
  // const handleLoginClick = () => {
  //   loginWithPopup()
  // }
  // const handleLogoutClick = () => {
  //   logout()
  // }
  return (
    <div className="App">
      <h1>Hi from App</h1>
      {/* <Todos /> */}
      {/* <button onClick={handleLoginClick}>Login</button> */}
      {/* <button onClick={handleLogoutClick}>Log out</button> */}
      <Router>
        <NavBar />
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

export default App