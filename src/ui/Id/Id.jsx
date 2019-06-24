import React, { useState } from 'react'
import { green } from 'logger'

const Id = (props) => {
  green('Id: props', props)
  const [_id, set_id] = useState('')

  const handleInputChange = (e) => {
    set_id(e.target.value)
  }

  const handleSetIdClick = () => {
    props.handleSetId(_id)
  }

  return (
    <div>
      <input type='text' value={_id} onChange={handleInputChange} />
      <button onClick={handleSetIdClick}>Set Id</button>
    </div>
  )
}

export default Id