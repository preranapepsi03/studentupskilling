import React from 'react';

export function TaskItem({ title, isCompleted }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-sm hover:border-zinc-700 transition duration-200 flex items-center justify-between w-full">
      <span className={`text-base font-medium ${isCompleted ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
        {title}
      </span>
      <span className={`text-xs px-3 py-1 rounded-full font-bold ${isCompleted ? 'bg-zinc-800 text-zinc-400' : 'bg-blue-500/10 text-blue-400'}`}>
        {isCompleted ? 'Completed' : 'Active'}
      </span>
    </div>
  );
}