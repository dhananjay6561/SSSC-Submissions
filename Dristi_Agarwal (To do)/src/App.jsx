import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  function addTask() {
    if (task.trim() === "") return;
    setList([
      ...list,
      {
        text: task,
        done: false,
      },
    ]);
    setTask("");
  }
  function deleteTask(index) {
    setList(list.filter((item, i) => i !== index));
  }
  function completeTask(index) {
    const newList = [...list];
    newList[index].done = !newList[index].done;
    setList(newList);
  }
  return (
    <div className="container">
      <h1>📝<u> My Todo List</u></h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <h3>Total Tasks: {list.length}</h3>
      {list.length === 0 ? (
        <p>No tasks added yet 🫠</p>
      ) : (
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <span
                className={item.done ? "completed" : ""}
              >
                {item.text}
              </span>
              <button onClick={() => completeTask(index)}>
                {item.done ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteTask(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;