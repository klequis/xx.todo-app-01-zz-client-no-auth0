import React, { useState } from 'react'

const AddTodo = props => {
  
  const [_title, _setTitle] = useState('')
  
  const { setTitle } = props

  const handleInputChange = e => {
    _setTitle(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setTitle(_title)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        onChange={handleInputChange}
        type='text'
        value={_title}
      />
      <button type='submit'>Add</button>
      <button type='button'>Cancel</button>
    </form>
  )
}

export default AddTodo