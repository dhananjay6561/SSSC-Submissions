import { useState } from "react";

function TodoItem(props) {
  return (
    <li>
      <span
        style={{
          textDecoration: props.done ? "line-through" : "none",
          color: props.done ? "green" : "black",
          
        }}
      >
        {props.text}
      </span>

      <button onClick={props.completeTask}>
        {props.done ? "X" : "O"}
      </button>

      <button onClick={props.deleteTask}>
        Delete
      </button>
    </li>
  );
}

function TodoApp() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  function addTask() {
    if (task !== "") {
      setList(
        list.concat({
          text: task,
          done: false
        })
      );
      setTask("");
    }
  }

  function deleteTask(index) {
    setList(
      list.filter(function (item, i) {
        return i !== index;
      })
    );
  }

  function completeTask(index) {
    let newList = [];

    list.forEach(function (item, i) {
      if (i === index) {
        newList.push({
          text: item.text,
          done: !item.done
        });
      } else {
        newList.push(item);
      }
    });

    setList(newList);
  }

  return (
    <>
      <div className="container">
        <h1>Todo List</h1>

        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />

        <button onClick={addTask}>Add</button>

        <ul>
          {list.map(function (item, index) {
            return (
              <TodoItem
                key={index}
                text={item.text}
                done={item.done}
                completeTask={function () {
                  completeTask(index);
                }}
                deleteTask={function () {
                  deleteTask(index);
                }}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default TodoApp;