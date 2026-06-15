import React, { useState, useEffect } from 'react';
import { TaskItem } from './components/TaskItem';

export function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // 1. Fetch tasks when page loads
  useEffect(() => {
    async function getBackendTasks() {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("❌ Failed to pull tasks:", error);
      }
    }
    getBackendTasks();
  }, []);

  // 2. Handle submitting the form
  async function handleAddTask(e) {
    e.preventDefault();
    if (!taskInput.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: taskInput })
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]); // Add the new task to state instantly
        setTaskInput(''); // Clear the input field
      }
    } catch (error) {
      console.error("❌ Failed to add new task:", error);
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>My Database Tasks (In React!)</h1>
      
      {/* 3. MAKE SURE THIS FORM CONTAINER IS PRESENT */}
      <form onSubmit={handleAddTask} style={{ marginBottom: '25px' }}>
        <input 
          type="text" 
          placeholder="Enter a new task..." 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={{ 
            padding: '10px', 
            width: '260px', 
            borderRadius: '6px', 
            border: '1px solid #444', 
            backgroundColor: '#1e1e1e', 
            color: '#fff',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '10px 20px', 
            marginLeft: '10px', 
            borderRadius: '6px', 
            backgroundColor: '#007bff', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add Task
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            title={task.title} 
            isCompleted={task.is_completed} 
          />
        ))}
      </ul>
    </div>
  );
}

export default App;