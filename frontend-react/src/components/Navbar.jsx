import React from 'react';

export function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center w-full">
      <span className="text-xl font-bold text-blue-500 tracking-wide">✨ StackTask</span>
      <div className="text-sm text-zinc-400">Day 13 Dashboard</div>
    </nav>
  );
}