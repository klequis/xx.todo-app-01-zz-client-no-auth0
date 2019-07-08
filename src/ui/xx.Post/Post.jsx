import React from "react"
import { connect } from 'react-redux'
import { todoCreateRequest } from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'

class Post extends React.Component  {

  state = {
    title: '',
  }

  handleInputChagne = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { setData, setError } = this.props
    try {
      await this.props.todoCreateRequest({ title: this.state.title })
      setData(this.props.todos)
    } catch (e) {
      console.log('FAILURE')
      setError(e)
      console.log('ERROR:', e)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type='text' 
          value={this.state.title} 
          onChange={this.handleInputChagne}
          placeholder='title / description'
        />
        <input
          type='submit'
          value='POST'
        />
      </form>
    )
  }
}
                  
const actions = { todoCreateRequest }

const mapStateToProps = (state) => {
  return {
    todos: getAllTodos(state),
  }
}

export default connect(mapStateToProps, actions)(Post)