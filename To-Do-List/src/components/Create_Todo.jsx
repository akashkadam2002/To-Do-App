import React, {useState} from 'react';
import '../App.css'
import axios from 'axios';

function Create_Todo() {
  var [task, settask] = useState();
  const addTodo = () =>{

      axios.post("http://127.0.0.1:3000/add", {task:task})
      .then(result=>{
        location.reload()
      })
      .catch((err)=> console.log(err));
      settask = '';
  }
  return (
    <div className='create_form'>
      <input type="text" placeholder='Enter task' onChange={(e) => settask(e.target.value)} />
      <button className='mx-2' type='submit' onClick={addTodo}>Add</button>
    </div>
  )
}

export default Create_Todo
