import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import TodoItem from "./TodoItem";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  function addTodo(e) {
    e.preventDefault();

    if (task.trim() === "") {
      return;
    }

    const newTodo = {
      id: uuidv4(),
      text: task,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updated);
  }

  return (
    <div className="app">
      <h1>Todo List</h1>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit">
          <FontAwesomeIcon icon={faPlus} /> Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p>No tasks added.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;