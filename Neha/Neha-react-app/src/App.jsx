import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { MdAutoDelete } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";


function App() {
  const [viewMode,setViewMode] = useState('todo')
  const [allTodos,setTodos]= useState([]);
  const [newtitle,setNewTitle]= useState("");
  const [newDescription,setNewDescription]=useState("");

  const [completedTodos,setcompletedTodos] = useState([]);
  const handleAddTodo=()=>{
    let newTodoItem = {
      title:newtitle,
      description:newDescription
    }
    let updateTodoArr =[...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    setNewTitle("");
    setNewDescription("");
    localStorage.setItem('todolist',JSON.stringify(updateTodoArr));
  };
  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  } 
  const handleComplete = (index)=>{
    let now = new Date();
    let dd =now.getDate();
    let mm = now.getMonth()+1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s= now.getSeconds();
    let completeOn = dd+ '-'+mm+'-'+yyyy +'at' +h +'-'+m +'-'+s;

    let filterItem={
      ...allTodos[index],
      completeOn:completeOn
    }
    let updateCompletedArr = [...completedTodos]
    updateCompletedArr.push(filterItem);
    setcompletedTodos(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updateTodoArr));
  }
  const handleDeleteCompletedTodo  = (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);

    localStorage.setItem('CompletedTodos',JSON.stringify(reducedTodo));
    setcompletedTodos(reducedTodo)
  }
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('comletedTodo'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setcompletedTodos(savedCompletedTodo);
      
    }

         },[])

  return (
    <>
      <section id="App">
        <div>
          <h1>MY TODO LIST</h1>
 {/* paragraph below my todo list */}
          <p>
            Add your tasks and manage your daily activities effectively ! </p>
        </div>
      </section>


      <section id="next-steps">
        <div id="docs">
          
          <div className='todo-wrapper'>
            <div className='todo-input'>
              <div className='todo-input-item'>
              <label >Title</label>
              <input type="text" value={newtitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='Enter your task title' />
            </div>
            <div className='todo-input-item'>
              <label >Description</label>
              <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='Enter your task Description' />
            </div>
            <div className='todo-input-item'>
              <label ></label>
              <button type="button" onClick={handleAddTodo} className='primarybtn'>Add Task</button>
            </div>
            </div>

            <div className='btn-area'>
              <button className={`secondrybtn ${viewMode==='todo' ? 'active' : ''}`}
                onClick={()=>setViewMode('todo')}
              >TODO</button>
              
              <button className={`secondrybtn ${viewMode==='completed' ? 'active' : ''}`}
                onClick={()=>setViewMode('completed')}
              >COMPLETED</button>
            </div>

            <div className='todo-list'>
              {viewMode==='todo' && allTodos.map((item,index)=>(
                <div className='todo-list-item' key={index}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <MdAutoDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?'/>
                    <FaCircleCheck className='check-icon' onClick={()=>handleComplete(index)} title='Complete?'/>
                  </div>
                </div>
              ))}

              {viewMode==='completed' && completedTodos.map((item,index)=>(
                <div className='todo-list-item' key={index}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <p><small>Completed on: {item.completeOn}</small></p>
                  </div>
                  <div>
                    <MdAutoDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete?'/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
        
      

      
      
    </>
  )
}

export default App
