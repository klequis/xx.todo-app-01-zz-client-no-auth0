import React from "react"
import logo from "./logo.svg"
import "./App.css"
import Get from './Get'
import Post from './Post'
import Delete from './Delete'
import UnknownEndpoint from './UnknownEndpoint'
import ErrorPane from './ErrorPane'

const codeStyle = {
  color: 'white',
  textAlign: 'left'
}
class App extends React.Component {

  state = {
    data: '',
    error: ''
  }

  setData = (data) => {
    this.setState({
      data: data
    })
  }

  setError = (data) => {
    this.setState({
      error: data
    })
  }
  
  render() {
    return (
      <div className="App">
        <ErrorPane error={this.state.error} setError={this.setError} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Get setData={this.setData} setError={this.setError} />
          <Post setData={this.setData} setError={this.setError} />
          <Delete setData={this.setData} setError={this.setError} />
          <UnknownEndpoint setError={this.setError} />
          <div>
            <pre style={codeStyle}>
              {JSON.stringify(this.state.data, null, 4)}
            </pre>
          </div>
        </header>
      </div>
    )
  }
}

export default App
