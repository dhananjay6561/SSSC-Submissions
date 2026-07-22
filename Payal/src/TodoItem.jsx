import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function TodoItem({ todo, onDelete }) {
  return (
    <li 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '12px', 
        borderBottom: '1px solid #444',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        marginBottom: '5px',
        borderRadius: '4px'
      }}
    >
      <span style={{ color: '#fff' }}>{todo.text}</span>
      <button 
        onClick={() => onDelete(todo.id)} 
        style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '16px' }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  )
}

export default TodoItem
