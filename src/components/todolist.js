import React, { useState } from 'react';
import TodoForm from './todoform';
import Todo from './todo';
import "./todolist.css"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"

function TodoList() {


  const navigate=useNavigate();

 const callHome=async()=>{
  
  const res=await fetch("/about",{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
    },
    credentials:"include",
  })
  console.log(res.status)
  if(res.status!==200){
    navigate("/login");
  }

 }

  useEffect(()=>{
    callHome();
  });  









  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className='todo'>
      <div className='todoList'>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      </div>
    </div>
  );
}

export default TodoList;