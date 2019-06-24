import React from 'react'
import Todo from './Todo'

const TodoList = props => {
  const { todos } = props
  return (
    <div>
      {
        todos.map(t => <Todo todo={t} />)
      }
    </div>
  )
}

export default TodoList