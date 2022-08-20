import React from 'react';
import "./app.css"
import  { BrowserRouter as Router, Routes, 
  Route} from "react-router-dom";
import TodoList from './components/todolist';
import Signup from "./Signup/Signup"
import Login from "./Login/Login"
function App() {
  return (
    <div className='todo-app'>

      <Router>
    <Routes>
         <Route exact path="/" element={<TodoList/>}/> 
          <Route path="/signup" element= {<Signup/>}/> 
          <Route path="/login" element={<Login/>}/>    
    </Routes>
    </Router>
 
    </div>
  );
}

export default App;