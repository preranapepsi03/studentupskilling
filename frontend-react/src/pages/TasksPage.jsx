import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskItem } from '../components/TaskItem';

export function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch your database tasks on initial mount
  useEffect(() => {
    async function getBackendTasks() {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error("❌ Axios fetch failed:", error);
        setErrorMessage('Could not connect to the database server.');
      } finally {
        setIsLoading(false);
      }
    }
    getBackendTasks();
  }, []);

  // Day 17 — Form Event Handler Block
  async function handleAddTask(e) {
    // 1. Prevent standard browser reloading behavior on form submit
    e.preventDefault(); 
    
    // 2. Prevent submitting blank spaces to PostgreSQL
    if (!taskInput.trim()) return; 

    try {
      // 3. Post data payload directly to backend database server
      const response = await axios.post('http://localhost:5000/tasks', {
        title: taskInput.trim()
      });

      // 4. Update local view state with the freshly saved task record dynamically
      setTasks([...tasks, response.data]);
      
      // 5. Empty out the form text field input box after successful save
      setTaskInput('');
    } catch (error) {
      console.error("❌ Form submission failed:", error);
      alert('Failed to save task to the database.');
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 mb-6">Database Management</h1>
      
      {/* Day 17 — The Add Task Form Element */}
      <form onSubmit={handleAddTask} className="flex gap-3 mb-8 max-w-xl">
        <input 
          type="text" 
          placeholder="Add a new data record..." 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition duration-200"
        />
        {/* Day 17 — The Form Submit Button */}
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-lg shadow-blue-600/10 whitespace-nowrap">
          Add Task
        </button>
      </form>

      {/* Database View Interface Lists */}
      {isLoading ? (
        <div className="flex items-center gap-3 text-zinc-400 py-6">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Streaming database states...</span>
        </div>
      ) : errorMessage ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm max-w-xl">
          ⚠️ {errorMessage}
        </div>
      ) : tasks.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center max-w-xl">
          <span className="text-3xl">📭</span>
          <h3 className="text-zinc-200 font-bold mt-3">Your database queue is empty</h3>
          <p className="text-sm text-zinc-500 mt-1">Type an operational task entry above to commit a record directly to PostgreSQL.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 w-full">
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              title={task.title} 
              isCompleted={task.is_completed} 
            />
          ))}
        </div>
      )}
    </div>
  );
}