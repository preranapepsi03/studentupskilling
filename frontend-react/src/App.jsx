import React from 'react';
import { TaskItem } from './components/TaskItem';

export function App() {
  // 1. A mock array of task objects (exactly like what your PostgreSQL database outputs!)
  const tasksArray = [
    { id: 1, title: "Learn React Basics", is_completed: true },
    { id: 2, title: "Master Components and Props", is_completed: false },
    { id: 3, title: "Connect React to PostgreSQL", is_completed: false },
    { id: 4, title: "Deploy the fullstack application", is_completed: false }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>My Database Tasks (In React!)</h1>
      
      <ul>
        {/* 2. Use JSX curly braces to run JavaScript's .map() loop */}
        {tasksArray.map((task) => {
          return (
            <TaskItem 
              key={task.id} 
              title={task.title} 
              isCompleted={task.is_completed} 
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;