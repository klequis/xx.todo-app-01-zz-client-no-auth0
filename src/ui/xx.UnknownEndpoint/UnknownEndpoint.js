import React from "react"
import fetchJson from "./fetchJson"

class UnknownEndpoint extends React.Component {

  handleSubmit = async e => {
    const { setData, setError } = this.props
    try {
      e.preventDefault()  
      const r1 = await fetchJson("http://localhost:3030/api/unknown", {
        method: "GET",
      })
      console.log('SUCCESS')
      const r2 = await r1.json()
      setData(r2)
    } catch (e) {
      setError(e)
      console.log("ERROR:", e)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Unknown Endpoint" />
      </form>
    )
  }
}

export default UnknownEndpoint
