import React, { useState } from 'react';
import axios from 'axios';

function Create() {
  const [task, setTask] = useState();
  const handleAdd = () => {
  axios.post('https://localhost:3001/add', {task: task})
  .then(result => console.log(result))
  .catch(err => console.log(err))
  }
  return (
    <div>
      <input type='text' name='' id='' className='create-form' onChange={(e) => {setTask(e.target.value)}}/>
      <button type='button' className='form-btn' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create;