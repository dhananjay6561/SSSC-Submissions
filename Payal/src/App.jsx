import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import TodoItem from './TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    if (!task.trim()) return

    const newTodo = {
      id: uuidv4(),
      text: task,
    }

    setTodos([...todos, newTodo])
    setTask('')
  }

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id)
    setTodos(updatedTodos)
  }

  return (
    
    <div style={{ 
      backgroundColor: '#121214', 
      minHeight: '100vh', 
      width: '100vw',
      margin: 0,
      padding: '40px 20px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, sans-serif',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* Title Header */}
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        marginBottom: '30px', 
        color: '#646cff',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        TODO
      </h1>

      {/* Main Container */}
      <div style={{ width: '100%', maxWidth: '450px', backgroundColor: '#1e1e24', padding: '25px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
        
        <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Add a new task..." 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #333', 
              backgroundColor: '#121214', 
              color: '#fff',
              fontSize: '16px'
            }}
          />
          <button type="submit" style={{ 
            padding: '12px 18px', 
            cursor: 'pointer', 
            borderRadius: '6px', 
            backgroundColor: '#646cff', 
            color: '#fff', 
            border: 'none',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            {/* Soft fallback text if icon fails to render */}
            <FontAwesomeIcon icon={faPlus} /> + Add
          </button>
        </form>

        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {todos.map((item) => (
            <TodoItem 
              key={item.id} 
              todo={item}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
        
        {todos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '10px' }}>No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  )
}

export default App
