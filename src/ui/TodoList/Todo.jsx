import React from 'react'

const todoStyle = {
  marginBottom: '1em'
}

const Todo = (props) => {

  const { title, completed, _id } = props.todo

  return (
    <div style={todoStyle}>
      <div><b>_id:</b> {_id}</div>
      <div><b>Title:</b> {title}</div>
      <div><b>Completed:</b> {completed ? 'yes' : 'no'}</div>
    </div>
  )

}

export default Todo