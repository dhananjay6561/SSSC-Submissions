import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function TodoApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Low");
  const [date, setDate] = useState("");

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

    useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      priority: priority,
      date: date,
    };

    setTodos([...todos, newTodo]);
    setInput("");
    setDate("");
    setPriority("Low");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function editTodo(id, newText) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "Completed") return todo.completed;
      if (filter === "Active") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(search.toLowerCase())
    );

  const completedCount = todos.filter((t) => t.completed).length;
  const progressPercent = todos.length
    ? Math.round((completedCount / todos.length) * 100)
    : 0;

  return (
    <div className="todo-container">
      <div className="header">
        <h1>My Tasks</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={addTodo} style={{ width: "100%", marginTop: "6px" }}>
        Add Task
      </button>

      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "15px" }}
      />

      <div className="filter-buttons">
        {["All", "Active", "Completed"].map((type) => (
          <button
            key={type}
            className={filter === type ? "active" : ""}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
          />
        ))}
      </div>

      <div className="progress-section">
        <span>Progress: {progressPercent}%</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="stats">
        <span>Total: {todos.length}</span>
        <span>Completed: {completedCount}</span>
      </div>
    </div>
  );
}

export default TodoApp;