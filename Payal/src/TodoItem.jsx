import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className="todo-item">
      <span
        className={todo.completed ? "completed" : ""}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>

      <button onClick={() => onDelete(todo.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
}

export default TodoItem;