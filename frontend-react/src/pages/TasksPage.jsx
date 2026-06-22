import React, { useState, useEffect } from 'react';
import { TaskItem } from '../components/TaskItem';

export function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

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
        setTasks([...tasks, newTask]);
        setTaskInput('');
      }
    } catch (error) {
      console.error("❌ Failed to add new task:", error);
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 mb-6">Database Management</h1>
      
      <form onSubmit={handleAddTask} className="flex gap-3 mb-8 max-w-xl">
        <input 
          type="text" 
          placeholder="Add a new data record..." 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition duration-200"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-lg shadow-blue-600/10 whitespace-nowrap">
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4 w-full">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            title={task.title} 
            isCompleted={task.is_completed} 
          />
        ))}
      </div>
    </div>
  );
}