import './App.css';
import { useState } from 'react';

function App() {
  let [todolist, setTodolist]= useState([])

   let SaveTask=(event)=>{
    
    let task=event.target.task.value;
    if (!todolist.includes(task)){
      let finalList=[...todolist,task]
      setTodolist(finalList)
    }
    else{
      alert("Task already exists...")
    }
    
    event.preventDefault();
  }
  let list=todolist.map((value,index)=>{
    return(
      <TodoListItems value={value} key={index} indexNumber={index} 
      todolist={todolist} 
      setTodolist={setTodolist}
      />
    )
  })

  return (
    <div className='App'>
     <h1>ToDo List</h1>
     <form onSubmit={SaveTask}>
      <input type='text' name="task"/> <button>Add</button>
     </form>

     <div className='Lists'>
       <ul>
         {list}
       </ul>
     </div>
    </div>
  );
}

export default App;

function TodoListItems({value,indexNumber,todolist,setTodolist}){
  let [status,setStatus]= useState(false)

  let deleteRow=()=>{
    let final=todolist.filter((v,i)=>i!=indexNumber)
    setTodolist(final)
  }
  let checkStatus=()=>{
    setStatus(!status)
  }
  return(
    <li className={(status)? 'completeTask':''} onClick={checkStatus}>{indexNumber+1}.  {value}<span onClick={deleteRow}>&times;</span></li>
  )
}

