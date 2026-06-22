import React from 'react';

export function Sidebar() {
  // Get the current URL path directly from the browser window safely
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  // Helper utility function to toggle active Tailwind classes dynamically
  const getTabStyle = (path) => {
    const baseStyle = "block px-4 py-2.5 rounded-xl transition font-medium duration-200 ";
    const isActive = currentPath === path;
    
    return isActive 
      ? `${baseStyle} text-blue-400 bg-blue-500/10 shadow-sm shadow-blue-500/5` 
      : `${baseStyle} text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50`;
  };

  return (
    <aside className="w-64 bg-zinc-950 p-6 border-r border-zinc-800 hidden md:block min-h-[calc(100vh-73px)] select-none">
      <ul className="space-y-2">
        <li>
          <a href="/" className={getTabStyle('/')}>
            🏠 Home Overview
          </a>
        </li>
        <li>
          <a href="/dashboard" className={getTabStyle('/dashboard')}>
            📊 System Metrics
          </a>
        </li>
        <li>
          <a href="/tasks" className={getTabStyle('/tasks')}>
            📋 Live Database Tasks
          </a>
        </li>
      </ul>
    </aside>
  );
}