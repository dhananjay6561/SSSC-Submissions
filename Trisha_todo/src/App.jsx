import { useState } from 'react';
import './App.css';


function Todolist() {
  const [todos, setTodos] = useState([]);
  const [inputvalue, setInputvalue] = useState('');

  const addTodo = () => {
    if (inputvalue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputvalue.trim(),
    };

    setTodos([...todos, newTodo]);
    setInputvalue('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };


  return (
    <>
      <h1>MY TODO LIST</h1>
      <div className="Bigbox">
        <div className="Taskbox">
          <input
            type="text"
            value={inputvalue}
            onChange={(e) => setInputvalue(e.target.value)}
            placeholder="Enter task" />
          <button className = "style" onClick={addTodo}>Add</button>
        </div>

        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              <span>{todo.text}</span>
              <button className = "style" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

