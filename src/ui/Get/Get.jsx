import React from "react"
import { connect } from 'react-redux'
import { todosReadRequest, todosReadByIdRequest } from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'

class GetForm extends React.Component  {

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
    const { setId } = this.props
    setId(this.state.id)
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.id}
          onChange={this.handleInputChagne}
          placeholder='empty for all or _id'
        />
        <input
          type='submit'
          value='GET'
        />
      </form>
    )
  }
}

const actions = { todosReadRequest, todosReadByIdRequest }

const mapStateToProps = (state) => {
  return {
    todos: getAllTodos(state),
    // todosReadRequestStatus: getRequest(state, TODOS_READ_REQUEST_KEY)
  }
}

export default connect(mapStateToProps, actions)(GetForm)
