import React from 'react';

export function Home() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-black text-zinc-100 tracking-tight mb-4">
        Welcome to StackTask Workspace 🚀
      </h1>
      <p className="text-zinc-400 text-lg leading-relaxed mb-6">
        This is your central operational hub. Built with a lightning-fast PostgreSQL backend and styled with clean Tailwind v4 utility architectures.
      </p>
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <h3 className="text-blue-400 font-bold mb-2">💡 Quick Tip</h3>
        <p className="text-sm text-zinc-400">
          Use the left-hand navigation sidebar to check your real-time database health or process background data task modules smoothly.
        </p>
      </div>
    </div>
  );
}