import React from 'react';

export function Dashboard() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold text-zinc-100 mb-6">System Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="text-sm font-medium text-zinc-500 mb-1">Database Engine</div>
          <div className="text-xl font-bold text-emerald-400">PostgreSQL Live</div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="text-sm font-medium text-zinc-500 mb-1">UI Framework</div>
          <div className="text-xl font-bold text-sky-400">Preact + Tailwind v4</div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="text-sm font-medium text-zinc-500 mb-1">API Connections</div>
          <div className="text-xl font-bold text-blue-400">Express Proxy OK</div>
        </div>
      </div>
    </div>
  );
}