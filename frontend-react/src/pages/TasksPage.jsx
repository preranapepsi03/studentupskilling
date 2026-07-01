import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskItem } from '../components/TaskItem'; // Importing your clean component

export function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

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

  async function handleAddTask(e) {
    e.preventDefault(); 
    if (!taskInput.trim()) return; 

    try {
      const response = await axios.post('http://localhost:5000/tasks', {
        title: taskInput.trim()
      });
      setTasks([...tasks, response.data]);
      setTaskInput('');
    } catch (error) {
      console.error("❌ Form submission failed:", error);
      alert('Failed to save task to the database.');
    }
  }

  async function handleDeleteTask(id) {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("❌ Delete operation failed:", error);
      alert('Failed to remove task from database.');
    }
  }

  function startEditing(task) {
    setEditingId(task.id);
    setEditingTitle(task.title);
  }

  async function handleSaveEdit(id) {
    if (!editingTitle.trim()) return;
    
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, {
        title: editingTitle.trim()
      });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setEditingId(null);
      setEditingTitle('');
    } catch (error) {
      console.error("❌ Update operation failed:", error);
      alert('Failed to save task modifications to database.');
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 md:py-8 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-5 mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Database Control Panel
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-1">
            Day 20 Upgrade: Clean refactored state loops and reusable component design layouts.
          </p>
        </div>
        <div className="self-start sm:self-center bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full text-xs font-mono text-blue-400">
          Total Records: {tasks.length}
        </div>
      </div>
      
      <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3 mb-10 w-full max-w-2xl">
        <input 
          type="text" 
          placeholder="Commit an operational entry to PostgreSQL..." 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-1 bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-sm font-semibold px-6 py-3.5 rounded-xl transition duration-200 shadow-lg shadow-blue-600/10 active:scale-[0.98]">
          Add Task
        </button>
      </form>

      {isLoading ? (
        <div className="flex items-center gap-3 text-zinc-400 py-12 justify-center sm:justify-start">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-medium tracking-wide">Syncing data tables...</span>
        </div>
      ) : errorMessage ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm max-w-xl">
          ⚠️ {errorMessage}
        </div>
      ) : tasks.length === 0 ? (
        <div className="border border-dashed border-zinc-800 bg-zinc-900/10 rounded-2xl p-12 text-center max-w-xl">
          <span className="text-3xl block mb-2">📭</span>
          <h3 className="text-zinc-200 font-bold">No active table entities found</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">Database is listening.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {/* Day 20 Clean Loop execution passing structured props */}
          {tasks.map((task) => (
            <TaskItem 
              key={task.id}
              task={task}
              editingId={editingId}
              editingTitle={editingTitle}
              setEditingTitle={setEditingTitle}
              handleSaveEdit={handleSaveEdit}
              setEditingId={setEditingId}
              startEditing={startEditing}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}