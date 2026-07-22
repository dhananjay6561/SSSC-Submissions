import { useState } from "react";
function TodoItem({ todo, deleteTodo, toggleComplete, editTodo }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(todo.text);
  const handleEdit = () => {
    if (edit) {
      if (text.trim() !== "") {
        editTodo(todo.id, text);
      } 
      else { setText(todo.text);
      }
      setEdit(false);
    } else { setEdit(true);
    }
  };
  return (
    <div className="todo-item">
      <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
      {edit ? (<input value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus />
      ) : (
        <p className={todo.completed ? "completed" : ""}>{todo.text}</p>
      )}

      <span className={`priority ${todo.priority}`}>{todo.priority}</span>

      {todo.date && <p className="due-date">Due: {todo.date}</p>}

      <button onClick={handleEdit}>{edit ? "Save" : "Edit"}</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;