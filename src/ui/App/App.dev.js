import React, { /*useState,*/ useEffect } from 'react'
import { connect } from 'react-redux'
import {
  todoCreateRequest,
  todoDeleteRequest,
  todosReadRequest,
  todoUpdateRequest,
} from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'
import './App.css'
import DevTools from 'ui/DevTools'
import TodoList from 'ui/TodoList'
import AddTodo from 'ui/AddTodo'
import NavBar from 'ui/NavBar'

import { green, red } from 'logger'

const devToolStyle = {
  textAlign: 'left'
}

const App = props => {

  const { todoCreateRequest, todoDeleteRequest, todosReadRequest, todos, todoUpdateRequest } = props
  
  useEffect(() => {
    ;(async () => {
      try {
        await todosReadRequest()
      } catch (e) {
        console.log('TheError', e)
      }
    })()
  }, [todosReadRequest])

  const handleAddTodo = async title => {
    try {
      await todoCreateRequest({ title })
    } catch (e) {
      red('App.handleAddTodo ERROR:', e)
    }
  }

  const handleDeleteTodo = async id => {
    green('App.handleDeleteTodo: id', id)
    try {
      await todoDeleteRequest(id)
    } catch (e) {
      red('App.handleDeleteTodo ERROR:', e)
    }
  }

  const handleCompletedChange = async todo => {
    green('handleCompletedChange: todo', todo)
    try {
      await todoUpdateRequest(todo)
    } catch (e) {
      red('App.handleCompletedChange ERROR:', e)
    }
  }

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Your Todo List</h1>
        <AddTodo handleAddTodo={handleAddTodo} />
        <TodoList todos={todos} handleCompletedChange={handleCompletedChange} handleDeleteTodo={handleDeleteTodo} />
      </header>
      <div style={devToolStyle}>
        <DevTools />
      </div>
    </div>
  )
}

const actions = { todoCreateRequest, todoDeleteRequest, todosReadRequest, todoUpdateRequest }

const mapStateToProps = state => {
  return {
    todos: getAllTodos(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(App)
