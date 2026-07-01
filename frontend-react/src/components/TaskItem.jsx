import React from 'react';

export function TaskItem({ 
  task, 
  editingId, 
  editingTitle, 
  setEditingTitle, 
  handleSaveEdit, 
  setEditingId, 
  startEditing, 
  handleDeleteTask 
}) {
  const isEditing = editingId === task.id;

  if (isEditing) {
    return (
      <div className="flex flex-col justify-between bg-zinc-900/30 backdrop-blur-sm border border-emerald-800/40 rounded-xl p-4.5 min-h-[100px] transition-all duration-300">
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500"
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-1">
            <button 
              onClick={() => handleSaveEdit(task.id)}
              className="bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold px-3 py-1.5 rounded-md transition"
            >
              Save
            </button>
            <button 
              onClick={() => setEditingId(null)}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-semibold px-3 py-1.5 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/60 rounded-xl p-4.5 min-h-[100px] hover:bg-zinc-900/50 hover:border-zinc-700/60 transition-all duration-300 group">
      <div className="flex flex-col h-full justify-between gap-4">
        <span className="text-zinc-200 text-sm font-medium break-words leading-relaxed">
          {task.title}
        </span>
        
        <div className="flex items-center justify-between border-t border-zinc-800/40 pt-2 mt-auto">
          <span className="text-[10px] font-mono text-zinc-600">ID: {task.id}</span>
          
          <div className="flex items-center gap-1.5 opacity-100 sm:opacity-40 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={() => startEditing(task)}
              className="text-zinc-400 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-800 transition text-xs"
              title="Edit entry"
            >
              ✏️
            </button>
            <button 
              onClick={() => handleDeleteTask(task.id)}
              className="text-zinc-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-zinc-800 transition text-xs"
              title="Delete entry permanently"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}