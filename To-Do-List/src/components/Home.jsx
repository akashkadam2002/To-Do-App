import React, { useState, useEffect } from 'react';
import Create_Todo from './Create_Todo';
import '../App.css'; // Assuming you have global styles
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Correct import from 'react-icons/bs'

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos(); // Fetch todos on component mount
    }, []);

    const fetchTodos = () => {
        axios.get("http://127.0.0.1:3000/get")
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        axios.put(`http://127.0.0.1:3000/update/${id}`)
            .then(result => {
                // Update todos state to reflect the change
                setTodos(prevTodos => prevTodos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, done: true }; 
                    }
                    return todo;
                }));
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:3000/delete/${id}`)
            .then(result => {
                // Filter out the deleted todo from todos state
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h1>Todo List</h1>
            <Create_Todo />
            {
                todos.length === 0 ?
                    <div>
                        <h3>No todos to display</h3>
                    </div> :
                    todos.map(todo => (
                        <div className='todo' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {
                                    todo.done ? <BsFillCheckCircleFill className="icon" />
                                        : <BsCircleFill className="icon" />
                                }
                                <p className={todo.done ? "line_through" : ""}>
                                    {todo.task}
                                </p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
