import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { todoCreateRequest, todosReadRequest } from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'
import './App.css'
import DevTools from 'ui/DevTools'
import TodoList from 'ui/TodoList'
import AddTodo from 'ui/AddTodo'

import { green } from 'logger'

const App = props => {
  const [title, setTitle] = useState('')
  
  
  // const [id, setId] = useState('')
  
  const { todoCreateRequest, todosReadRequest, todos } = props
  useEffect(() => {
    (async () => {
      try {
        await todosReadRequest()

      } catch (e) {
        console.log('TheError', e)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        await todoCreateRequest(title)
      } catch (e) {
        console.log('TheError', e)
      }
    })()
  }, [])

  green('todos', todos)
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hi</h1>
        <AddTodo setTitle={setTitle} />
        <TodoList todos={todos} />
      </header>
      <DevTools />
    </div>
  )
}

const actions = { todoCreateRequest, todosReadRequest }

const mapStateToProps = state => {
  return {
    todos: getAllTodos(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(App)
