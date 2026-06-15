import React from 'react';

// This function acts as a reusable blueprint!
// It takes a parameter called 'props' (short for properties)
export function TaskItem(props) {
  return (
    <li style={{ 
      padding: '8px 0', 
      textDecoration: props.isCompleted ? 'line-through' : 'none',
      color: props.isCompleted ? '#888' : '#fff'
    }}>
      {props.title}
    </li>
  );
}