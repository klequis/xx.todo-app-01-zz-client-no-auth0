import React from "react"
import { connect } from 'react-redux'
import { todoDeleteRequest } from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'
// import { green } from 'logger'

class Delete extends React.Component  {

  state = {
    id: '',
  }

  handleInputChagne = (e) => {
    this.setState({
      id: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { setData, setError } = this.props
    try {
      await this.props.todoDeleteRequest(this.state.id)
      setData(this.props.todos)
    } catch (e) {
      console.log('FAILURE');
      setError(e)
      console.log('ERROR:', e)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type='text' 
          value={this.state.id} 
          onChange={this.handleInputChagne}
          placeholder='_id'
        />
        <input
          type='submit'
          value='DELETE'
        />
      </form>
    )
  }
}

const actions = { todoDeleteRequest }

const mapStateToProps = (state) => {
  return {
    todos: getAllTodos(state),
  }
}

export default connect(mapStateToProps, actions)(Delete)
