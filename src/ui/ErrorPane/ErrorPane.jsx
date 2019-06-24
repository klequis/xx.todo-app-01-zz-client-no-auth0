import React from "react";
import { isEmpty } from 'ramda'

class ErrorPane extends React.Component {
  clear = () => {
    const { setError } = this.props
    setError('')
  }


  renderMessage = (error) => {
    return Object.keys(error).map(k => {
      return <div key={k}>{`${k}: ${error[k]}`}</div>
    })
  }

  renderPane = () => {
    const { error } = this.props
    
    if (isEmpty(error)) {
      return null
    } else {
      
      return (
        <div>
          {this.renderMessage(error)}      
          <div>
            <button
              onClick={this.clear}
            >
              Clear
            </button>  
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderPane()}
      </div>
    )
  }
}

export default ErrorPane